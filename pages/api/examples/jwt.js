// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt'

const secret = process.env.SECRET

export default async (req, res) =>  {
  const token = await jwt.getJwt({ req, secret })
  console.log( JSON.stringify(token, null, 2) )
  res.end()
}