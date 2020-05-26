import Link from 'next/link'
import NextAuth from 'next-auth/client'
import Header from '../components/header'

const Page = ({session}) => (
  <main>
    <h1>Example Page 3</h1>
    <Header/>
    <ul>
      <li><Link href="/"><a>Home</a></Link></li>
      <li><Link href="/example-page-1"><a>Example Page 1</a></Link></li>
      <li><Link href="/example-page-2"><a>Example Page 2</a></Link></li>
      <li><Link href="/example-page-3"><a>Example Page 3</a></Link></li>
    </ul>
    <p>
      This page uses the universal <strong>NextAuth.session()</strong> method in <strong>getInitialProps()</strong>.
    </p>
    <p>
      The <strong>session()</strong> method supports both client and server side rendering.
    </p>
    <p>
      Because this page also supports server side rendering, it does not require JavaScript in the browser.
      Server side page rendering is slower than client side rendering.
    </p>
    <p>
      As <strong>session()</strong> is called in <strong>getInitialProps()</strong> it will always update in the client on every page load.
    </p>
  </main>
)

Page.getInitialProps = async (context) => {
  return {
    session: await NextAuth.session(context)
  }
}

export default Page