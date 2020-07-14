import Layout from '../components/layout'

export default () => (
  <Layout>
    <h1>Privacy Policy</h1>
    <p>
      This site uses JSON Web Tokens and an in-memory database which resets every ~2 hours.
    </p>
    <p>
      Data provided to this site is exclusively used to support signing in
      and is not passed to any third party services, other than via SMTP or OAuth for the
      purposes of authentication.
    </p>
  </Layout>
)