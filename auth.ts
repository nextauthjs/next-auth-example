import NextAuth from "next-auth"
import "next-auth/jwt"

import Apple from "next-auth/providers/apple"
// import Atlassian from "next-auth/providers/atlassian"
import Auth0 from "next-auth/providers/auth0"
import AzureB2C from "next-auth/providers/azure-ad-b2c"
import BankIDNorway from "next-auth/providers/bankid-no"
import BoxyHQSAML from "next-auth/providers/boxyhq-saml"
import Cognito from "next-auth/providers/cognito"
import Coinbase from "next-auth/providers/coinbase"
import Discord from "next-auth/providers/discord"
import Dropbox from "next-auth/providers/dropbox"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import GitLab from "next-auth/providers/gitlab"
import Google from "next-auth/providers/google"
import Hubspot from "next-auth/providers/hubspot"
import Keycloak from "next-auth/providers/keycloak"
import LinkedIn from "next-auth/providers/linkedin"
import MicrosoftEntraId from "next-auth/providers/microsoft-entra-id"
import Netlify from "next-auth/providers/netlify"
import Okta from "next-auth/providers/okta"
import Passage from "next-auth/providers/passage"
import Passkey from "next-auth/providers/passkey"
import Pinterest from "next-auth/providers/pinterest"
import Reddit from "next-auth/providers/reddit"
import Slack from "next-auth/providers/slack"
import Salesforce from "next-auth/providers/salesforce"
import Spotify from "next-auth/providers/spotify"
import Twitch from "next-auth/providers/twitch"
import Twitter from "next-auth/providers/twitter"
import Vipps from "next-auth/providers/vipps"
import WorkOS from "next-auth/providers/workos"
import Zoom from "next-auth/providers/zoom"
import { createStorage } from "unstorage"
import memoryDriver from "unstorage/drivers/memory"
import vercelKVDriver from "unstorage/drivers/vercel-kv"
import { UnstorageAdapter } from "@auth/unstorage-adapter"

const storage = createStorage({
  driver: process.env.VERCEL
    ? vercelKVDriver({
        url: process.env.AUTH_KV_REST_API_URL,
        token: process.env.AUTH_KV_REST_API_TOKEN,
        env: false,
      })
    : memoryDriver(),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  adapter: UnstorageAdapter(storage),
  providers: [
    // highlight-start
    {
      id: "ory",
      name: "Ory",
      type: "oidc",
      issuer: process.env.ORY_SDK_URL,
      clientId: process.env.ORY_CLIENT_ID,
      clientSecret: process.env.ORY_CLIENT_SECRET,
      checks: ["pkce" as never, "state" as never],
      token: {
        idToken: true,
      },
    },
    // highlight-eng
  ],
  basePath: "/auth",
  session: { strategy: "jwt" },
  // highlight-start
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    session({ session, token }) {
      session.sid = token.sid
      session.idToken = token.idToken
      return session
    },
    jwt({ token, account, profile }) {
      if (profile) {
        token.sid = profile.sid
      }
      if (account) {
        token.idToken = account.id_token
      }
      return token
    },
  },
  // highlight-end
  experimental: { enableWebAuthn: true },
})

declare module "next-auth" {
  interface Session {
    accessToken?: string
    // highlight-start
    sid: string
    idToken?: string
    // highlight-end
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    // highlight-start
    sid: string
    idToken?: string
    // highlight-end
  }
}

// highlight-start
declare module "next-auth" {
  interface Profile {
    sid: string
  }
}
// highlight-end
