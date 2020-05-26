import Link from 'next/link'
import Header from '../components/header'

export default () => (
  <main>
    <h1>Example Page 1</h1>
    <Header/>
    <ul>
      <li><Link href="/"><a>Home</a></Link></li>
      <li><Link href="/example-page-1"><a>Example Page 1</a></Link></li>
      <li><Link href="/example-page-2"><a>Example Page 2</a></Link></li>
      <li><Link href="/example-page-3"><a>Example Page 3</a></Link></li>
    </ul>
    <p>
      This page uses the <strong>NextAuth.useSession()</strong> React Hook in the <strong>&lt;/Header&gt;</strong> component.
    </p>
    <p>
      The <strong>useSession()</strong> Hook is very fast to render and easy to use.
    </p>
    <p>
      React Hooks require client side JavaScript.
    </p>
  </main>
)
