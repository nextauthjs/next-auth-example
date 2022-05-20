import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

export interface OpenCollectiveProfile extends Record<string, any> {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

function OpenCollective<P extends OpenCollectiveProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "opencollective",
    name: "Open Collective",
    type: "oauth",
    authorization: "https://opencollective.com/oauth/authorize",
    // authorization: "http://localhost:3000/oauth/authorize",
    token: "https://opencollective.com/oauth/token",
    // token: "http://localhost:3060/oauth/token",
    userinfo: {
      url: "https://opencollective.com/graphql",
      // url: "http://localhost:3060/graphql",
      params: {
        query: "{me{id name email imageUrl}}",
      },
    },
    profile({ data: { me: profile } }) {
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.imageUrl,
      };
    },
    options,
  };
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    OpenCollective({
      clientId: process.env.OPENCOLLECTIVE_ID,
      clientSecret: process.env.OPENCOLLECTIVE_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("callbacks", "jwt", {
      //   token,
      //   user,
      //   account,
      //   profile,
      //   isNewUser,
      // });
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token, user }) {
      // console.log("callbacks", "session", {
      //   session,
      //   token,
      //   user,
      // });
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
