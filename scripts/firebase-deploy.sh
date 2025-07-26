#!/usr/bin/env bash

# Configuration constants
SECRET_VARS=("AUTH_SECRET" "AUTH_GOOGLE_ID" "AUTH_GOOGLE_SECRET" "NEXTAUTH_URL" "AUTH_TRUST_HOST")
SECRET_IDS=("auth-secret" "auth-google-id" "auth-google-secret" "nextauth-url" "auth-trust-host")

main() {
    set -euo pipefail
    npm i -g firebase-tools
    deploy_secrets
    # firebase deploy
}

deploy_secrets() {
    # Get project root and file paths
    local project_root=$(get_project_root)
    local env_file="$project_root/.env.local"
    
    # Load configuration
    log_step "Loading configuration from Firebase files..."
    local config=$(load_configuration "$project_root")
    if [[ $? -ne 0 ]]; then
        exit 1
    fi
    
    local project_id=$(echo "$config" | cut -d'|' -f1)
    local backend_id=$(echo "$config" | cut -d'|' -f2)
    
    log_info "Using project ID: $project_id"
    log_info "Using backend ID: $backend_id"
    
    # Set GCP project
    log_step "Setting GCP project to '$project_id'..."
    gcloud config set project "$project_id" --quiet >/dev/null
    
    # Validate and load environment
    validate_env_file "$env_file" || exit 1
    load_environment_variables "$env_file"
    validate_environment_variables || exit 1
    
    # Create temporary directory
    local temp_dir=$(mktemp -d)
    
    # Create secrets
    create_temp_secret_files "$temp_dir"
    create_or_update_secrets "$project_id" "$temp_dir"
    grant_iam_permissions "$project_id"
    grant_firebase_access "$backend_id"
    
    # Cleanup
    cleanup_temp_files "$temp_dir"
    
    log_success "All secrets deployed! Your App Hosting backend can now build & run with these secrets."
}

# Get the project root directory
get_project_root() {
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    echo "$(dirname "$script_dir")"
}

# Print colored output
log_info() {
    echo "ℹ️  $1"
}

log_success() {
    echo "✅ $1"
}

log_warning() {
    echo "⚠️  $1"
}

log_error() {
    echo "❌ $1"
}

log_step() {
    echo "🔧 $1"
}

# Load configuration from files
load_configuration() {
    local project_root="$1"
    
    local project_id=$(read_project_id "$project_root")
    local backend_id=$(read_backend_id "$project_root")
    
    if [[ -z "$project_id" ]] || [[ -z "$backend_id" ]]; then
        return 1
    fi
    
    echo "$project_id|$backend_id"
}

# Read project ID from .firebaserc
read_project_id() {
    local project_root="$1"
    local firebaserc_file="$project_root/.firebaserc"
    
    if [[ ! -f "$firebaserc_file" ]]; then
        log_error ".firebaserc file not found at $firebaserc_file"
        return 1
    fi
    
    local project_id=$(grep -o '"default": *"[^"]*"' "$firebaserc_file" | cut -d'"' -f4)
    if [[ -z "$project_id" ]]; then
        log_error "Could not find project ID in .firebaserc"
        return 1
    fi
    
    echo "$project_id"
}

# Read backend ID from firebase.json
read_backend_id() {
    local project_root="$1"
    local firebase_json_file="$project_root/firebase.json"
    
    if [[ ! -f "$firebase_json_file" ]]; then
        log_error "firebase.json file not found at $firebase_json_file"
        return 1
    fi
    
    local backend_id=$(grep -o '"backendId": *"[^"]*"' "$firebase_json_file" | cut -d'"' -f4)
    if [[ -z "$backend_id" ]]; then
        log_error "Could not find backendId in firebase.json"
        return 1
    fi
    
    echo "$backend_id"
}

# Validate .env.local file exists
validate_env_file() {
    local env_file="$1"
    
    if [[ ! -f "$env_file" ]]; then
        log_error ".env.local file not found at $env_file"
        log_error "Please create this file with your environment variables."
        log_error "Required variables: ${SECRET_VARS[*]}"
        return 1
    fi
    
    log_success "Found .env.local file: $env_file"
}

# Load environment variables from .env.local
load_environment_variables() {
    local env_file="$1"
    
    log_step "Loading environment variables from .env.local..."
    
    set -a  # automatically export all variables
    source "$env_file"
    set +a  # stop automatically exporting
}

# Validate required environment variables
validate_environment_variables() {
    log_step "Validating required environment variables..."
    
    for i in "${!SECRET_VARS[@]}"; do
        local envvar="${SECRET_VARS[$i]}"
        
        if [[ -z "${!envvar:-}" ]]; then
            log_error "$envvar is not set in .env.local"
            log_error "Please add $envvar=your_value to your .env.local file"
            return 1
        fi
        
        # Check if variable contains placeholder values
        if [[ "${!envvar}" == *"YOUR_"* ]] || [[ "${!envvar}" == *"your-"* ]]; then
            log_warning "$envvar appears to contain placeholder values."
            log_error "Please update it with your actual value in .env.local"
            return 1
        fi
        
        log_success "Found: $envvar"
    done
}

# Create temporary files for secrets
create_temp_secret_files() {
    local temp_dir="$1"
    
    log_step "Creating temporary secret files..."
    
    for i in "${!SECRET_VARS[@]}"; do
        local envvar="${SECRET_VARS[$i]}"
        local secret_id="${SECRET_IDS[$i]}"
        local temp_file="$temp_dir/$secret_id.txt"
        
        # Write the environment variable value to a temporary file
        echo "${!envvar}" > "$temp_file"
        log_info "Created temporary file: $temp_file"
    done
}

# Create or update secrets in Google Cloud Secret Manager
create_or_update_secrets() {
    local project_id="$1"
    local temp_dir="$2"
    
    log_step "Creating or updating secrets in Google Cloud Secret Manager..."
    
    for i in "${!SECRET_VARS[@]}"; do
        local secret_id="${SECRET_IDS[$i]}"
        local temp_file="$temp_dir/$secret_id.txt"
        
        if gcloud secrets describe "$secret_id" --project="$project_id" --quiet &>/dev/null; then
            log_info "Secret '$secret_id' exists, adding new version…"
            gcloud secrets versions add "$secret_id" \
                --data-file="$temp_file" \
                --project="$project_id" \
                --quiet
        else
            log_info "Creating secret '$secret_id'…"
            gcloud secrets create "$secret_id" \
                --data-file="$temp_file" \
                --project="$project_id" \
                --quiet
        fi
    done
}

# Grant IAM permissions to Firebase service account
grant_iam_permissions() {
    local project_id="$1"
    
    log_step "Granting IAM permissions to Firebase service account..."
    
    for i in "${!SECRET_VARS[@]}"; do
        local secret_id="${SECRET_IDS[$i]}"
        log_info "Granting roles/secretmanager.secretAccessor on '$secret_id' to Firebase service account…"
        gcloud secrets add-iam-policy-binding "$secret_id" \
            --member="serviceAccount:service-971892823924@gcp-sa-firebaseapphosting.iam.gserviceaccount.com" \
            --role="roles/secretmanager.secretAccessor" \
            --project="$project_id" \
            --quiet
    done
}

# Grant Firebase App Hosting access to secrets
grant_firebase_access() {
    local backend_id="$1"
    
    log_step "Granting Firebase App Hosting access to secrets..."
    
    for i in "${!SECRET_VARS[@]}"; do
        local secret_id="${SECRET_IDS[$i]}"
        log_info "Granting Firebase App Hosting access to '$secret_id' on backend '$backend_id'…"
        firebase apphosting:secrets:grantaccess "$secret_id" \
            --backend "$backend_id" \
            --non-interactive
    done
}

# Clean up temporary files
cleanup_temp_files() {
    local temp_dir="$1"
    
    log_step "Cleaning up temporary files..."
    rm -rf "$temp_dir"
}

main