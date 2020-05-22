import NextAuth from 'next-auth/client'

export default () => {
  const [ session, loading ] = NextAuth.useSession()
  
  return (
    <p>
      {session && <>
        Signed in as {session.user.email}
        {' '}
        <a href={`/api/auth/signout`}>Sign out</a>
      </>}
      {!session && <>
        Not signed in
        {' '}
        <a href={`/api/auth/signin`}>Sign in</a>
      </>}
    </p>
  )
}