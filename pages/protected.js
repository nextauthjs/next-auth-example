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

export async function getServerSideProps(context) {
  // If you need to make calls to a service (e.g. an API or database) to make
  // data avalible only to authenticated users, you can do that here by checking
  // the session object is not null or by accessing the contents of session.user
  const session = await getSession(context)
  return {
    props: { session }
  }
}