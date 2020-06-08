import Nav from '../components/nav'
import Footer from '../components/footer'

export default () => (
  <>
    <Nav/>
    <main>
      <h1>NextAuth.js Demo</h1>
      <p>
        This is an example project that uses <a href={`https://www.npmjs.com/package/next-auth/v/beta`}>next-auth@beta</a>.
      </p>
      <p>
        See <a href="https://next-auth.js.org">next-auth.js.org</a> for more information and documentation.
      </p>
      <p>
        This live demo uses an in-memory database which is automatically erased after ~2 hours.
      </p>
    </main>
    <Footer/>
  </>
)