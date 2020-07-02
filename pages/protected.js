import { getSession } from 'next-auth/client'
import Layout from '../components/layout'

const AccessDenied = () =>
  <Layout>
    <h1>Access Denied</h1>
    <p>
      <a href="/api/auth/signin">You must be signed in to view this page</a>
    </p>
  </Layout>

const Page = ({session}) => {
  if (!session) { return <AccessDenied/> }

  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>You are signed in and can view this page.</p>
    </Layout>
  )
}

Page.getInitialProps = async (context) => {
  return {
    session: await getSession(context)
  }
}

export default Page

