import { withAuth } from "next-auth/middleware"

// Only logged-in users with the "admin" role will be able to see the pages under the "/admin" path.
// More on how NextAuth middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.userRole === "admin",
  },
})
