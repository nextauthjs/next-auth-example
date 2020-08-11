// This is an example of to protect an API route
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    res.send({ content: 'This is protected content.' })
  } else {
    res.send({ error: 'Access denied' })
  }
}