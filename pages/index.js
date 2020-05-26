import Link from 'next/link'
import Header from '../components/header'

export default () => (
  <main>
    <h1>NextAuth.js Example</h1>
    <Header/>
    <ul>
      <li><Link href="/"><a>Home</a></Link></li>
      <li><Link href="/example-page-1"><a>Example Page 1</a></Link></li>
      <li><Link href="/example-page-2"><a>Example Page 2</a></Link></li>
      <li><Link href="/example-page-3"><a>Example Page 3</a></Link></li>
    </ul>
    <p>
      This is an example project that uses <a href={`https://www.npmjs.com/package/next-auth/v/beta`}>next-auth@beta</a>.
    </p>
    <p>
      See <a href="https://next-auth.js.org">next-auth.js.org</a> for more information and documentation.
    </p>
    <p>
      <a href="https://github.com/iaincollins/next-auth-example">View source on GitHub</a>
    </p>
  </main>
)