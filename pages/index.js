import Nav from '../components/nav'
import Footer from '../components/footer'

export default () => (
  <>
    <Nav/>
    <main>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example project that uses <a href={`https://www.npmjs.com/package/next-auth/v/beta`}>next-auth@beta</a>.
      </p>
      <p>
        See <a href="https://next-auth.js.org">next-auth.js.org</a> for more information and documentation.
      </p>
    </main>
    <Footer/>
  </>
)