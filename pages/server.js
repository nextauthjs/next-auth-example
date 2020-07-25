import { useSession, getSession } from 'next-auth/client'
import Layout from '../components/layout'

export default function Page () {
  const [ session, loading ] = useSession()

  return (
    <Layout>
      <h1>Server Side Rendering</h1>
      <p>
        This page uses the universal <strong>getSession()</strong> method in <strong>getServerSideProps()</strong>.
      </p>
      <p>
        Using <strong>getSession()</strong> in <strong>getServerSideProps()</strong> is the recommended approach if you need to
        support Server Side Rendering with authentication.
      </p>
      <p>
        The advantage of Server Side Rendering is this page does not require client side JavaScript.
      </p>
      <p>
        The disadvantage of Server Side Rendering is that this page is slower to render.
      </p>
      <p>
        <em>You are <strong>{session ? 'signed in' : 'not signed in'}</strong>.</em>
      </p>
    </Layout>
  )
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}
