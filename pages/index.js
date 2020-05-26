import Header from '../components/header'

export default () => (
  <main>
    <h1>NextAuth.js Example</h1>
    <Header/>
    <p>
      This is an example project that uses <a href={`https://www.npmjs.com/package/next-auth/v/beta`}>next-auth@beta</a>.
    </p>
    <p>
      See <a href="https://next-auth.js.org">next-auth.js.org</a> for more information and documentation.
    </p>
    <p>
      <a href="https://github.com/iaincollins/next-auth-example">View source on GitHub</a>
    </p>
  </main>
)