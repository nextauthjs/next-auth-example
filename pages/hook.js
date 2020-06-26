import Layout from '../components/layout'

export default () => (
  <Layout>
    <h1>React Hook</h1>
    <p>
      This page uses the <strong>useSession()</strong> React Hook in the <strong>&lt;/Header&gt;</strong> component.
    </p>
    <p>
      The <strong>useSession()</strong> Hook easy to use and allows pages to render very quickly.
    </p>
    <p>
      Session data is shared between pages by using the NextAuth.js <strong>Provider</strong> in <strong>_app.js</strong> so
      that navigation between pages using the <strong>useSession()</strong> Hook is very fast.
    </p>
    <p>
      React Hooks require client side JavaScript.
    </p>
  </Layout>
)