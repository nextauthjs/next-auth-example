import { Provider } from 'next-auth/client'
import './styles.css'

export default ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session} >
      <Component {...pageProps} />
    </Provider>
  )
}