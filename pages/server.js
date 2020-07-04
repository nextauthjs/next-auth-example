import { getSession } from 'next-auth/client'
import Layout from '../components/layout'

export default ({session}) => (
  <Layout>
    <h1>Server Side Rendering</h1>
    <p>
      This page uses the universal <strong>getSession()</strong> method in <strong>getServerSideProps()</strong>.
    </p>
    <p>
      Using <strong>getSession()</strong> in <strong>getServerSideProps()</strong> is the recommended approach if you need to
      support server side rendering with authentication.
    </p>
    <p>
      The advantage of server side rendering is this page does not require client side JavaScript.
    </p>
    <p>
      The disadvantage of server side rendering is that this page is slower to render.
    </p>
  </Layout>
)

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}