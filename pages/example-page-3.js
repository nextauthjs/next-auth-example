import { session } from 'next-auth/client'
import Nav from '../components/nav'

const Page = ({session}) => (
  <main>
    <h1>Example Page 3</h1>
    <Nav/>
    <h2>About this page</h2>
    <p>
      This page uses the universal <strong>session()</strong> method in <strong>getInitialProps()</strong>.
    </p>
    <p>
      <strong>getInitialProps()</strong> is called on every page render, both when pages are rendered on the server and when they are rendered client side.
      If you are not using the React Hook, you could use this approach, however using <strong>getServerSideProps()</strong> instead is recommended. 
    </p>
    <p>
      Server side page rendering is not as fast as client side rendering, so any page that uses this approach will be slower than a page that only uses the React Hook.
    </p>
    <p>
      This page does not require JavaScript in the browser to know if you are signed in.
    </p>
  </main>
)

Page.getInitialProps = async (context) => {
  return {
    session: await session(context)
  }
}

export default Page