import Link from 'next/link'
import { useSession } from 'next-auth/client'

export default () => {
  const [ session, loading ] = useSession()
  
  return (
    <>
      <hr/>
      <p>
        {session && <>
          Signed in as {session.user.email} <a href={`/api/auth/signout`}>Sign out</a>
        </>}
        {!session && <>
          Not signed in <a href={`/api/auth/signin`}>Sign in</a>
        </>}
      </p>
      <h4>Navigation</h4>
      <nav>
        <ul>
        <li><Link href="/"><a>Home</a></Link></li>
        <li><Link href="/example-page-1"><a>Example Page 1</a></Link></li>
        <li><Link href="/example-page-2"><a>Example Page 2</a></Link></li>
        <li><Link href="/example-page-3"><a>Example Page 3</a></Link></li>
        </ul>
      </nav>
    </>
  )
}