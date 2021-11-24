import { SessionProvider } from "next-auth/react";
import "./styles.css";

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider refetchInterval={5 * 60} session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
