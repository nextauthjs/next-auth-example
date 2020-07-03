import { useSession, getSession } from 'next-auth/client'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'

export default () => {
  const [ session, loading ] = useSession()

  if (!session) { return <AccessDenied/> }

  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>This page is protected using server side protection, you must be signed in to access it.</p>
      <p>You can view this page because you are signed in.</p>
    </Layout>
  )
}