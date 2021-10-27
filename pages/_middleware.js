import { getToken } from "next-auth/jwt"

export async function middleware(req) {
  // return early if url isn't supposed to be protected
  if (req.url !== "/middleware-protected") {
    return
  }

  const session = await getToken({ req, secret: process.env.SECRET })
  // You could also check for any property on the session object,
  // like rolec === "admin" or name === "John Doe", etc.
  if (!session)
    return new Response(undefined, {
      headers: { Location: "/api/auth/signin" },
    })

  // If user is authenticated, continue.
}
