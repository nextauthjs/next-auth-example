// This is an example of how to access a session from an API route
import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getSession({ req })
  const token = await getToken({ req })
  console.log("Server token", token)
  res.send(JSON.stringify(token, null, 2))
  // res.send(JSON.stringify(session, null, 2))
}
