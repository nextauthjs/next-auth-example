import Link from 'next/link'
import NextAuth from 'next-auth/client'
import Header from '../components/header'

const Page = ({session}) => (
  <main>
    <h1>Example Page 1</h1>
    <Header/>
    <ul>
      <li><Link href="/"><a>Home</a></Link></li>
      <li><Link href="/example-page-1"><a>Example Page 1</a></Link></li>
      <li><Link href="/example-page-2"><a>Example Page 2</a></Link></li>
    </ul>
    <p>
      This page uses the universal <strong>NextAuth.session()</strong> method in <strong>getInitialProps()</strong>.
    </p>
    <p>
      The <strong>session()</strong> method supports both client and server side rendering.
    </p>
  </main>
)

Page.getInitialProps = async ({req}) => {
  return {
    session: await NextAuth.session({req})
  }
}

export default Page