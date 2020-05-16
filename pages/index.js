import NextAuth from 'next-auth/client'

export default ({ serverSession }) => {
  // The useSession() hook is the easiest way to get a session
  const [ clientSession, loading] = NextAuth.useSession()
  
  return (
  <div className='main'>
    <style jsx>{`
        .main {
          padding: 1rem 2em;
        }
        h1,h2,h3,p,li {
          font-family: Helvetica, sans-serif;
          line-height: 1.5rem;
        }
        h1 {
          margin: 0;
          font-size: 3rem;
          line-height: 3rem;
          font-weight: 300;
        }
        h2,h3 {
          font-weight: 600;
        }
        .lead {
          font-size: 1.2rem;
          line-height: 1.4rem;
          font-weight: 400;
        }
        pre {
          background: #222;
          color: #fff;
          padding: 1em; .5rem;
          border-radius: .5rem;
          font-size: 1.1rem;
          overflow-x: hidden;
        }
      `}</style>
      <h1>NextAuth Example</h1>
      <p className="lead">
        This is an example project that uses <a href={`https://www.npmjs.com/package/next-auth/v/beta`}>next-auth@beta</a>,
        see the <a href="https://github.com/iaincollins/next-auth/issues/99">NextAuth 2.0 announcement</a> for details
      </p>
      <h2>API Endpoints</h2>
      <p>
        <b>NextAuth 2.0</b> provides a complete, secure API for handling sign and sessions in via Email and/or oAuth (v1 &amp; v2).
      </p>
      <p>It is built for <b><a href="https://now.sh">Serverless</a></b> deployments with <b><a href="https://nextjs.org">Next.js</a></b>, but is compatible with Docker and other front end frameworks.</p>
      <ul>
        <li><a href="/api/auth/signin">/api/auth/signin</a></li>
        <li><a href="/api/auth/signout">/api/auth/signout</a></li>
        <li><a href="/api/auth/callback">/api/auth/callback</a></li>
        <li><a href="/api/auth/session">/api/auth/session</a></li>
        <li><a href="/api/auth/providers">/api/auth/providers</a></li>
        <li><a href="/api/auth/csrf">/api/auth/csrf</a></li>
        <li><a href="/api/auth/error">/api/auth/error</a></li>
      </ul>
      <p>
        NextAuth 2.0 comes with lightweight, unbranded pages to handle sign in, sign out and errors (powered by <a href="https://preactjs.com/">Preact</a>).
      </p>
      <p>
        Both the default path (/api/auth/*) and all pages (including error pages) can be customised so that you can create a fully branded experience.
      </p>
      <h2>Session</h2>
      <h3>Server Side Session</h3>
      <pre>{JSON.stringify(serverSession, null, 2)}</pre>
      <h3>Client Side Session</h3>
      <pre>{JSON.stringify(clientSession, null, 2)}</pre>
      <p>
        <em>
          Usualy client side rendering inherits session data from the server if you are using server side rendering on a page.
          This example this page does not, so that you can more easily observe session data being loaded via the `useSession()` hook.
        </em>
      </p>
      <h2>Notes</h2>
      <ul>
        <li>This example site is deployed using an in-memory database store, data is not persisted beyond a few minutes.</li>
        <li>Sessions are secured with Session Tokens stored in a server-only, secure cookie (they cannot be accessed from client side JavaScript).</li>
        <li>Access Tokens (which are different to Session Tokens) allow clients to make authenticated requests without exposing the Session Token.</li>
        <li>Only data that is safe to expose is available to client side JavaScript, this includes the users name and email address for display purposes.</li>
        <li>CSRF token is matched against a key and cryptographic hash generated with a secret that stored in a server-only, secure, host-only cookie.</li>
        <li>Cookie restrictions and prefixes (e.g. __HOST-, __SECURE-, etc) are relaxed by default on URLs like http://localhost for developer convenience.</li>
      </ul>
      <h2>View Source</h2>
      <p>
        You can find the source for this project at <a href="https://github.com/iaincollins/next-auth-example">github.com/iaincollins/next-auth-example</a>
      </p>
    </div>
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
