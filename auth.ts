import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth"

export const config = {
  providers: [
    Google(
      { clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }
    )
  ],
  basePath: "/api/auth",
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name
      return token
    },
  },
} satisfies NextAuthConfig

export const dev_config = {
  providers: [
    Google(
      { clientId: process.env.DEV_AUTH_GOOGLE_ID, clientSecret: process.env.DEV_AUTH_GOOGLE_SECRET }
    )
  ],
  basePath: "/api/auth",
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name
      return token
    },
  },
} satisfies NextAuthConfig

let configuration;

if (process.env.NODE_ENV === "development") {
  configuration = dev_config;
} else {
  configuration = config;
}

export const { handlers, auth, signIn, signOut } = NextAuth(configuration)
