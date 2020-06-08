import { getSession } from 'next-auth/client'
import Nav from '../components/nav'
import Footer from '../components/footer'

const Page = ({session}) => (
  <>
    <Nav/>
    <main>
      <h1>Example Page 3</h1>
      <p>
        This page uses the universal <strong>getSession()</strong> method in <strong>getInitialProps()</strong>.
      </p>
      <p>
        When using <strong>getInitialProps()</strong> it is called on every page render, both when pages are rendered on the server and when they are rendered client side.
      </p>
      <p>
        Server side page rendering is not as fast as client side rendering, so any page that uses this approach will be slower than a page that only uses the React Hook.
      </p>
      <p>
        This page does not require JavaScript in the browser to know if you are signed in.
      </p>
    </main>
    <Footer/>
  </>
)

Page.getInitialProps = async (context) => {
  return {
    session: await getSession(context)
  }
}

export default Page