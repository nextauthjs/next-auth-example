import { JWT } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

export default withAuth(
  function middleware(req: NextRequest & { nextauth: { token: JWT } }) {
    console.log("Middleware token", req.nextauth.token)
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
)
