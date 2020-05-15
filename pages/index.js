import NextAuth from 'next-auth/client'

export default ({ serverSession }) => {
  // The useSession() hook is the easiest way to get a session
  const [ clientSession, loading] = NextAuth.useSession()
  
  return (
    <>
      <style jsx>{`
        h1,h2,h3,p,li {
          font-family: Helvetica, sans-serif;
          line-height: 1.5em;
        }
        h1 {
          margin: 0;
        }
        h1,h2,h3 {
          font-weight: 300;
        }
        pre {
          background: #222;
          color: #fff;
          padding: 1em; .5em;
          border-radius: .5em;
          font-size: 1.1em;
          overflow-x: hidden;
        }
      `}</style>
      <h1>NextAuth 2.0 Example</h1>
      <p>
        <a href="https://github.com/iaincollins/next-auth-example">View this example on GitHub</a>
      </p>
      <p>
        A developer preview release of <a href={`https://www.npmjs.com/package/next-auth/v/beta`}>next-auth@beta</a>,
        see the <a href="https://github.com/iaincollins/next-auth/issues/99">NextAuth 2.0 announcement</a> for more details.
      </p>
      <ul>
        <li><a href="/api/auth/signin">/api/auth/signin</a> - Sign in (auto-generated page)</li>
        <li><a href="/api/auth/signout">/api/auth/signout</a> - Sign out (auto-generated page)</li>
        <li><a href="/api/auth/session">/api/auth/session</a> - Get the current users session</li>
        <li><a href="/api/auth/providers">/api/auth/providers</a> - Get configuration for providers</li>
        <li><a href="/api/auth/csrf">/api/auth/csrf</a> - Get Cross Site Request Forgery (CSRF) token</li>
      </ul>
      <h2>Session</h2>
      <h3>Server Side Session</h3>
      <pre>{JSON.stringify(serverSession, null, 2)}</pre>
      <h3>Client Side Session</h3>
      <pre>{JSON.stringify(clientSession, null, 2)}</pre>
      <p>
        <em>
          Clients normally inherit session data from the server. This
          example this page does not, so that you can more easily observe
          session data being loaded via the `useSession()` hook.
        </em>
      </p>
      <h2>Notes</h2>
      <ul>
        <li>This example site is deployed using an in-memory database store, data is not persisted beyond a few minutes.</li>
        <li>Sessions are secured with identifiers stored in a server-only, secure cookie (they cannot be accessed from client side JavaScript).</li>
        <li>Sessions identifiers are different to AccessTokens, which are provided as convenience way for application creators to identify users making client side calls.</li>
        <li>Only data that is safe to expose is available to client side JavaScript, this includes the users name and email address for display purposes.</li>
        <li>CSRF token is matched against a key and cryptographic hash generated with a secret that stored in a server-only, secure, host-only cookie.</li>
        <li>Cookie restrictions and prefixes (e.g. __HOST-, __SECURE-, etc) are relaxed by default on URLs like http://localhost for developer convenience.</li>
      </ul>
    </>
  )
}

// If you want to make a session avalible when server side rendering
// you can get the current a session using NextAuth.session({req})
// and return the result in getServerSideProps().
//
// You can also call NextAuth.session() in getInitialProps() in _app.js
// if you want all pages to be able access sessions when server side
// rendering, but this will disable static generation for all pages.
export async function getServerSideProps({req}) {
  return {
    props: {
      serverSession: await NextAuth.session({req})
    }
  }
}