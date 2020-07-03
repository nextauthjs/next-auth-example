import { Provider } from 'next-auth/client'
import './styles.css'

// @NOTE: These options are new in v3 beta and are work in progress
export default ({ Component, pageProps }) => {
  return (
    <Provider
      // Provider options are (as implied) optional, but are advanced options
      // intended for situations where you have a short session expiry time. 
      options={{
        // Client Max Age controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache)
        // * 60 - Sync with server if state is older than 60 seconds
        clientMaxAge: 0,
        // Refresh Interval controls how often the client will automatically
        // refresh the state with the client. Value in seconds.
        // e.g.
        // * 0  - Disabled (only when session state is queried by the client)
        // * 60 - Poll client every 60 seconds.
        refreshInterval: 0
      }}
      session={pageProps.session} >
      <Component {...pageProps} />
    </Provider>
  )
}