import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export default NextAuth({
     providers: [
          CredentialsProvider({
               // The name to display on the sign in form (e.g. 'Sign in with...')
               name: "Credentials",
               // The credentials is used to generate a suitable form on the sign in page.
               // You can specify whatever fields you are expecting to be submitted.
               // e.g. domain, username, password, 2FA token, etc.
               // You can pass any HTML attribute to the <input> tag through the object.
               credentials: {
                    username: {
                         label: "Username",
                         type: "text",
                         placeholder: "jsmith",
                    },
                    password: { label: "Password", type: "password" },
               },
               async authorize(credentials, req) {
                    const res = await fetch(
                         "http://localhost:3001/auth/login",
                         {
                              method: "POST",
                              body: JSON.stringify(credentials),
                              headers: { "Content-Type": "application/json" },
                         }
                    )
                    const user = await res.json()

                    // If no error and we have user data, return it
                    if (res.ok && user) {
                         return user
                    }
                    // Return null if user data could not be retrieved
                    return null
               },
          }),
     ],
     secret: "sdsdsdsdsdsd",

     session: {
          // Use JSON Web Tokens for session instead of database sessions.
          // This option can be used with or without a database for users/accounts.
          // Note: `strategy` should be set to 'jwt' if no database is used.
          strategy: "jwt",

          // Seconds - How long until an idle session expires and is no longer valid.
          // maxAge: 30 * 24 * 60 * 60, // 30 days

          // Seconds - Throttle how frequently to write to database to extend a session.
          // Use it to limit write operations. Set to 0 to always update the database.
          // Note: This option is ignored if using JSON Web Tokens
          // updateAge: 24 * 60 * 60, // 24 hours
     },

     // JSON Web tokens are only used for sessions if the `jwt: true` session
     // option is set - or by default if no database is specified.
     // https://next-auth.js.org/configuration/options#jwt
     jwt: {
          // You can define your own encode/decode functions for signing and encryption
          // if you want to override the default behaviour.
          // encode: async ({ secret, token, maxAge }) => {},
          // decode: async ({ secret, token, maxAge }) => {},
     },

     // You can define custom pages to override the built-in ones. These will be regular Next.js pages
     // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
     // The routes shown here are the default URLs that will be used when a custom
     // pages is not specified for that route.
     // https://next-auth.js.org/configuration/pages
     pages: {
          signIn: "/login", // Displays signin buttons
          // signOut: '/auth/signout', // Displays form with sign out button
          // error: '/auth/error', // Error code passed in query string as ?error=
          // verifyRequest: '/auth/verify-request', // Used for check email page
          // newUser: null // If set, new users will be directed here on first sign in
     },

     // Callbacks are asynchronous functions you can use to control what happens
     // when an action is performed.
     // https://next-auth.js.org/configuration/callbacks
     callbacks: {
          // async signIn({ user, account, profile, email, credentials }) { return true },
          // async redirect({ url, baseUrl }) { return baseUrl },
          // async session({ session, token, user }) { return session },
          // async jwt({ token, user, account, profile, isNewUser }) { return token }
     },

     // Events are useful for logging
     // https://next-auth.js.org/configuration/events
     events: {},

     // You can set the theme to 'light', 'dark' or use 'auto' to default to the
     // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
     theme: {
          colorScheme: "light",
     },

     // Enable debug messages in the console if you are having problems
     debug: false,
})
