import NextAuth from 'next-auth/client'
import './styles.css'

// Using the NextAuth Provider in _app.js is  optional, but improves performance 
// and reduces network calls by using a shared context for useSession()
export default ({ Component, pageProps }) => {
  const { session } = pageProps
  return (
    <NextAuth.Provider session={session}>
      <Component {...pageProps} />
    </NextAuth.Provider>
  )
}