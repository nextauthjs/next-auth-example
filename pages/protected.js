import { getSession } from 'next-auth/client'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'

export default ({session}) => {
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
  // If session exists, you can safely return other data here
  const session = await getSession(context)
  return {
    props: {
      session
    }
  }
}

