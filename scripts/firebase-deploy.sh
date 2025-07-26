#!/usr/bin/env bash

# Configuration constants
SECRET_VARS=("AUTH_SECRET" "AUTH_GOOGLE_ID" "AUTH_GOOGLE_SECRET" "NEXTAUTH_URL" "AUTH_TRUST_HOST")
SECRET_IDS=("AUTH_SECRET" "AUTH_GOOGLE_ID" "AUTH_GOOGLE_SECRET" "NEXTAUTH_URL" "AUTH_TRUST_HOST")

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
    
    # Wait for secrets to be fully created
    log_step "Waiting for secrets to be fully created..."
    sleep 10
    
    # Verify secrets exist
    verify_secrets_exist "$project_id" || exit 1
    
    grant_iam_permissions "$project_id"
    grant_firebase_access "$backend_id" "$project_id"
    
    # Verify Firebase can access secrets
    verify_firebase_access "$backend_id" "$project_id"
    
    # Cleanup
    cleanup_temp_files "$temp_dir"
    
    log_success "All secrets deployed and verified! Your App Hosting backend can now build & run with these secrets."
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
        local temp_file="$temp_dir/${secret_id}.txt"
        
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
        
        # Wait a moment for each secret to be fully created
        sleep 2
    done
}

# Verify that all secrets exist and are accessible
verify_secrets_exist() {
    local project_id="$1"
    
    log_step "Verifying all secrets exist and are accessible..."
    
    for i in "${!SECRET_VARS[@]}"; do
        local secret_id="${SECRET_IDS[$i]}"
        
        if ! gcloud secrets describe "$secret_id" --project="$project_id" --quiet &>/dev/null; then
            log_error "Secret '$secret_id' does not exist or is not accessible"
            return 1
        fi
        
        # Check if secret has at least one version
        local version_count=$(gcloud secrets versions list "$secret_id" --project="$project_id" --format="value(name)" | wc -l)
        if [[ $version_count -eq 0 ]]; then
            log_error "Secret '$secret_id' exists but has no versions"
            return 1
        fi
        
        log_success "Verified secret '$secret_id' exists with $version_count version(s)"
    done
}

# Grant IAM permissions to Firebase service account
grant_iam_permissions() {
    local project_id="$1"
    
    log_step "Granting IAM permissions to Firebase service account..."
    
    for i in "${!SECRET_VARS[@]}"; do
        local secret_id="${SECRET_IDS[$i]}"
        log_info "Granting roles/secretmanager.secretAccessor on '$secret_id' to Firebase service account…"
        
        # Add IAM policy binding with error handling
        if ! gcloud secrets add-iam-policy-binding "$secret_id" \
            --member="serviceAccount:service-971892823924@gcp-sa-firebaseapphosting.iam.gserviceaccount.com" \
            --role="roles/secretmanager.secretAccessor" \
            --project="$project_id" \
            --quiet; then
            log_warning "Failed to grant IAM permissions for '$secret_id', continuing..."
        else
            log_success "Granted IAM permissions for '$secret_id'"
        fi
    done
}

# Grant Firebase App Hosting access to secrets
grant_firebase_access() {
    local backend_id="$1"
    local project_id="$2"
    
    log_step "Granting Firebase App Hosting access to secrets..."
    
    for i in "${!SECRET_VARS[@]}"; do
        local secret_id="${SECRET_IDS[$i]}"
        log_info "Granting Firebase App Hosting access to '$secret_id' on backend '$backend_id'…"
        
        # Retry logic for granting access
        local max_retries=3
        local retry_count=0
        
        while [[ $retry_count -lt $max_retries ]]; do
            if firebase apphosting:secrets:grantaccess "$secret_id" \
                --backend "$backend_id" \
                --non-interactive; then
                log_success "Granted Firebase access to '$secret_id'"
                break
            else
                retry_count=$((retry_count + 1))
                if [[ $retry_count -lt $max_retries ]]; then
                    log_warning "Failed to grant access to '$secret_id' (attempt $retry_count/$max_retries), retrying in 5 seconds..."
                    sleep 5
                else
                    log_error "Failed to grant Firebase access to '$secret_id' after $max_retries attempts"
                    return 1
                fi
            fi
        done
    done
}

# Verify Firebase can access the secrets
verify_firebase_access() {
    local backend_id="$1"
    local project_id="$2"
    
    log_step "Verifying Firebase App Hosting can access secrets..."
    
    # List secrets accessible to the backend
    local accessible_secrets=$(firebase apphosting:secrets:list --backend "$backend_id" --non-interactive 2>/dev/null || echo "")
    
    for i in "${!SECRET_VARS[@]}"; do
        local secret_id="${SECRET_IDS[$i]}"
        
        if echo "$accessible_secrets" | grep -q "$secret_id"; then
            log_success "Verified Firebase can access '$secret_id'"
        else
            log_warning "Firebase access to '$secret_id' not confirmed, but continuing..."
        fi
    done
}

# Clean up temporary files
cleanup_temp_files() {
    local temp_dir="$1"
    
    log_step "Cleaning up temporary files..."
    rm -rf "$temp_dir"
}

main