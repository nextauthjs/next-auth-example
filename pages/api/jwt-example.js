// This is an example of how to read a JWT token. from an API route
//
// IMPORTANT! The JWT should never normally be exposed to the client in this
// way, as it would be insecure. This intended as an example only.
import jwt from 'next-auth/jwt'

const secret = process.env.SECRET

export default async (req, res) =>  {
  const token = await jwt.getJwt({ req, secret })
  console.log( JSON.stringify(token, null, 2) )
  res.end()
}