import { session } from 'next-auth/client'
import Nav from '../components/nav'

const Page = ({session}) => (
  <main>
    <h1>Example Page 2</h1>
    <Nav/>
    <h2>About this page</h2>
    <p>
      This page uses the universal <strong>session()</strong> method in <strong>getServerSideProps()</strong>.
    </p>
    <p>
      Using <strong>session()</strong> in <strong>getServerSideProps()</strong> is the recommended approach if you need to
      support server side rendering with authentication.
    </p>
    <p>
      Server side page rendering is not as fast as client side rendering, so any page that uses this approach will be slower than a page that only uses the React Hook.
    </p>
    <p>
      This page does not require JavaScript in the browser to know if you are signed in.
    </p>
  </main>
)

export async function getServerSideProps(context) {
  return {
    props: {
      session: await session(context)
    }
  }
}

export default Page