import Link from 'next/link'
import NextAuth from 'next-auth/client'
import Header from '../components/header'

export default ({ session }) => (
  <main>
    <h1>NextAuth.js Example</h1>
    <Header/>
    <ul>
      <li><Link href="/example-page-1"><a>Example Page 1</a></Link></li>
      <li><Link href="/example-page-2"><a>Example Page 2</a></Link></li>
    </ul>
    <p>
      This is an example project that uses <a href={`https://www.npmjs.com/package/next-auth/v/beta`}>next-auth@beta</a>.
    </p>
    <p>
      See <a href="https://next-auth.js.org">next-auth.js.org</a> for more information and documentation.
    </p>
    <p>
      You can <a href="https://github.com/iaincollins/next-auth-example">view source for this project</a> on GitHub.
    </p>
  </main>
)

export async function getServerSideProps({req}) {
  return {
    props: {
      session: await NextAuth.session({req})
    }
  }
}