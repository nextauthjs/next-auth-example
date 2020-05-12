import NextAuth from 'next-auth/client'

// Using the NextAuth Provider is optional, but improves performance 
// and reduces network calls by using a shared context for useSession()
export default ({ Component, pageProps }) => {
  return (
    <NextAuth.Provider>
      <Component {...pageProps} />
    </NextAuth.Provider>
  )
}