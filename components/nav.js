import Link from 'next/link'
import { useSession } from 'next-auth/client'

const isServer = typeof window === 'undefined'

export default () => {
  const [ session, loading ] = useSession()
  
  return (
    <nav>
      {/* 
        * The approach used here demonstrates how to avoid a flash of incorrect 
        * content on the initial load of pages, while working on pages that 
        * support server side rendering for clients without JavaScript.
        */}
      <noscript>
        <style>{`.js-hidden { opacity: 1 !important; }`}</style>
      </noscript>
      <p className={(!session && loading) ? 'js-hidden' : ''}>
        {session && <>
          <span>Signed in as <strong>{session.user.email}</strong></span>
          <a href={`/api/auth/signout`}><button>Sign out</button></a>
        </>}
        {!session && <>
          <span>Not signed in</span>
          <a href={`/api/auth/signin`}><button>Sign in</button></a>
        </>}
      </p>
      <h4>Navigation</h4>
      <ul>
        <li><Link href="/"><a>Home</a></Link></li>
        <li><Link href="/example-page-1"><a>Example Page 1</a></Link></li>
        <li><Link href="/example-page-2"><a>Example Page 2</a></Link></li>
        <li><Link href="/example-page-3"><a>Example Page 3</a></Link></li>
      </ul>
    </nav>
  )
}