import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

import type { NextAuthConfig } from "next-auth"

export const config = {
  providers: [
    GitHub,
  ],
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

export const { handlers, auth, signIn, signOut } = NextAuth(config)
