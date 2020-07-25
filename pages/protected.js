import { useSession } from 'next-auth/client'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'

export default function Page () {
  const [ session, loading ] = useSession()

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display Access Denied
  // Note: This will also be displayed to clients that do not have client side 
  // JavaScript, unless the code for getServerSideProps is also enabled.
  if (!session) { return  <Layout><AccessDenied/></Layout> }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>This page is protected using server side protection, you must be signed in to access it.</p>
      <p>You can view this page because you are signed in.</p>
    </Layout>
  )
}

// You can combine this example with Server Side Rendering support by enabling
// this code. Enabling server side rendering will negatively impact performance.
/*
export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}
*/

