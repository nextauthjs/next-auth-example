import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

/** @param {import("next/server").NextRequest} req */
export async function middleware(req) {
  if (req.nextUrl.pathname === "/middleware-protected") {
    console.log({
      cookies: req.cookies,
      secret: process.env.SECRET,
      secure:
        process.env.NEXTAUTH_URL?.startsWith("https://") ??
        !!process.env.VERCEL_URL,
    })
    const session = await getToken({ req, secret: process.env.SECRET })
    console.log({ session })
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.redirect("/api/auth/signin")
    // If user is authenticated, continue.
  }
}
