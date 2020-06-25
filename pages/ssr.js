import { getSession } from 'next-auth/client'
import Nav from '../components/nav'
import Footer from '../components/footer'

export default ({session}) => (
  <>
    <Nav/>
    <main>
      <h1>Server Side Rendering</h1>
      <p>
        This page uses the universal <strong>getSession()</strong> method in <strong>getServerSideProps()</strong>.
      </p>
      <p>
        Using <strong>getSession()</strong> in <strong>getServerSideProps()</strong> is the recommended approach if you need to
        support server side rendering with authentication.
      </p>
      <p>
        <strong>Server side page rendering is not as fast as client side rendering</strong>, so any page that uses this approach will be slower than a page that only uses the React Hook.
      </p>
      <p>
        This page does not require client side JavaScript.
      </p>
    </main>
    <Footer/>
  </>
)

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}