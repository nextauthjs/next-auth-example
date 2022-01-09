import { SessionProvider, useSession } from "next-auth/react"
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
                    {Component.auth ? (
                         <Auth>
                              <Component {...pageProps} />
                         </Auth>
                    ) : (
                         <Component {...pageProps} />
                    )}
               </SessionProvider>
          </Provider>
     )
}
function Auth({ children }) {
     const { data: session, status } = useSession({ required: true })
     const isUser = !!session?.user

     if (isUser) {
          return children
     }
     return <div>Loading...</div>
}
