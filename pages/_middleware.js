import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  // return early if url isn't supposed to be protected
  if (!req.url.includes("/middleware-protected")) {
    return NextResponse.next()
  }

  const session = await getToken({ req, secret: process.env.SECRET })
  // You could also check for any property on the session object,
  // like rolec === "admin" or name === "John Doe", etc.
  if (!session) return NextResponse.redirect("/api/auth/signin")

  // If user is authenticated, continue.
  return NextResponse.next()
}
