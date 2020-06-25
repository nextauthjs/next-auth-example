import Nav from '../components/nav'
import Footer from '../components/footer'

export default () => (
  <>
    <Nav/>
    <main>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example project to demonstrate <a href={`https://www.npmjs.com/package/next-auth/v/beta`}>NextAuth.js </a>.
      </p>
      <p>
        Go to <a href="https://next-auth.js.org">next-auth.js.org</a> for more information and documentation.
      </p>
      <p>
        This site uses JSON Web Tokens and an in-memory database which resets every ~2 hours.
      </p>
    </main>
    <Footer/>
  </>
)