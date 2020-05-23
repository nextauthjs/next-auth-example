import Link from 'next/link'
import Header from '../components/header'

export default () => (
  <main>
    <h1>Example Page 2</h1>
    <Header/>
    <ul>
      <li><Link href="/"><a>Home</a></Link></li>
      <li><Link href="/example-page-1"><a>Example Page 1</a></Link></li>
      <li><Link href="/example-page-2"><a>Example Page 2</a></Link></li>
    </ul>
    <p>
      This page uses the <strong>NextAuth.useSession()</strong> hook in the <strong>&lt;/Header&gt;</strong> component.
    </p>
    <p>
      The <strong>useSession()</strong> hook is fast, easy to use and requires client side JavaScript.
    </p>
  </main>
)
