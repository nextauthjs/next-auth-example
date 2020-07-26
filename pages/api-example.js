import Layout from '../components/layout'

export default function Page () {
  return (
    <Layout>
      <h1>API Example</h1>
      <p>The examples below show responses from the example API endpoints.</p>
      <p><em>You must be signed in to see responses.</em></p>
      <h2>Session</h2>
      <p>/api/examples/session</p>
      <iframe src="/api/examples/session"  border="1" width="100%" height="200px"/>
      <h2>JSON Web Token</h2>
      <p>/api/examples/jwt</p>
      <iframe src="/api/examples/jwt"  border="1" width="100%" height="200px"/>
    </Layout>
  )
}