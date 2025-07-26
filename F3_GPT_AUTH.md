# SSO Integration: Auth ↔ Chat

## 🔗 Shared Config

- **Secrets**
  - Set `NEXTAUTH_SECRET` (and if using JWT, `NEXTAUTH_JWT_SECRET`) **identically** in both apps.
- **Cookie scope**
  ```js
  // next-auth config (both apps)
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        domain: '.freemensworkout.org',
        path: '/',
        sameSite: 'none',
        secure: true
      }
    }
  }
  ```

````

* **Env vars**

  ```bash
  AUTH_APP_URL=https://auth.freemensworkout.org
  CHAT_APP_URL=https://chat.freemensworkout.org
  NEXTAUTH_SECRET=<your-secret>
  NEXTAUTH_JWT_SECRET=<your-jwt-secret>  # if using JWT sessions
  ```

---

## 🔐 Auth App (`auth.freemensworkout.org`)

1. **NextAuth setup**
   Create `/pages/api/auth/[...nextauth].js`:

   ```js
   import NextAuth from 'next-auth'
   import GitHubProvider from 'next-auth/providers/github'

   export default NextAuth({
     providers: [
       GitHubProvider({ clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET }),
       // …other providers
     ],
     secret: process.env.NEXTAUTH_SECRET,
     cookies: { /* shared cookie config */ },
     callbacks: {
       async jwt({ token, user }) { return token },
       async session({ session, token }) { return session }
     }
   })
   ```
2. **CORS**
   Ensure your Firebase‑hosted API routes allow `chat.freemensworkout.org` with `credentials: 'include'`.

---

## 🤖 Chat App (`chat.freemensworkout.org`)

1. **Install & configure NextAuth**

   ```bash
   npm install next-auth
   ```

   Create `/pages/api/auth/[...nextauth].js`:

   ```js
   import NextAuth from 'next-auth'

   export default NextAuth({
     providers: [],              // no direct login flows here
     secret: process.env.NEXTAUTH_SECRET,
     session: { jwt: true },
     cookies: { /* shared cookie config */ }
   })
   ```
2. **Fetch session**

   * **SSR** (`getServerSideProps`):

     ```js
     import { getSession } from 'next-auth/client'

     export async function getServerSideProps(ctx) {
       const session = await getSession({ req: ctx.req })
       return { props: { session } }
     }
     ```
   * **CSR** (React hook):

     ```js
     useEffect(() => {
       fetch(`${process.env.AUTH_APP_URL}/api/auth/session`, {
         credentials: 'include'
       })
         .then(r => r.json())
         .then(data => setSession(data))
     }, [])
     ```
3. **Login / Logout buttons**

   ```jsx
   // Login
   <button
     onClick={() =>
       window.location.href =
         `${process.env.AUTH_APP_URL}/api/auth/signin?callbackUrl=${process.env.CHAT_APP_URL}`
     }
   >
     Login
   </button>

   // Logout
   <button
     onClick={() =>
       window.location.href =
         `${process.env.AUTH_APP_URL}/api/auth/signout?callbackUrl=${process.env.CHAT_APP_URL}`
     }
   >
     Logout
   </button>
   ```

---

## 🔄 Flow Summary

1. **User clicks “Login”** in Chat → redirect to
   `https://auth.freemensworkout.org/api/auth/signin?callbackUrl=https://chat.freemensworkout.org`
2. **Auth App** performs OAuth, issues a cookie scoped to `.freemensworkout.org`
3. **Auth** redirects back to Chat with the cookie set
4. **Chat App** reads session via `/api/auth/session` (cookie)
5. **Logout** uses the reverse via
   `https://auth.freemensworkout.org/api/auth/signout?callbackUrl=https://chat.freemensworkout.org`
````
