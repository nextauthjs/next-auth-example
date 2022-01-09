import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
import { store } from "../components/store"
import "antd/dist/antd.css"

export default function App({ Component, pageProps }) {
     return (
          <Provider store={store}>
               <SessionProvider
                    options={{ staleTime: 0, refetchInterval: 0 }}
                    session={pageProps.session}
               >
                    <Component {...pageProps} />
               </SessionProvider>
          </Provider>
     )
}
