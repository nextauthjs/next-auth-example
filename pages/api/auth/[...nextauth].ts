import NextAuth, { NextAuthOptions } from "next-auth"
import SalesforceProvider from "next-auth/providers/salesforce";
import axios from 'axios'
import qs from 'qs'

const tokenIntrospection = async (tokenObject: any) => {
  try {
      var data = qs.stringify({
          'token': tokenObject.accessToken,
          'token_type_hint': 'access_token',
          'client_id': process.env.SALESFORCE_CLIENT_ID,
          'client_secret': process.env.SALESFORCE_CLIENT_SECRET
      });

      const tokenResponse = await axios({
          method: 'post',
          url: `${process.env.SALESFORCE_URL_LOGIN}/services/oauth2/introspect`,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
          },
          data: data
      });

      return await tokenResponse.data;
  } catch (error) {
      return {
          error: "TokenIntrospectionError",
      }
  }
}

/**
* Consume token object and returns a new updated `accessToken`.
* @param tokenObject 
*/
const refreshAccessToken = async (tokenObject: any) => {
  try {
      var data = qs.stringify({
          'grant_type': 'refresh_token',
          'client_id': process.env.SALESFORCE_CLIENT_ID,
          'client_secret': process.env.SALESFORCE_CLIENT_SECRET,
          'refresh_token': tokenObject.refreshToken
      });

      const tokenResponse = await axios({
          method: 'post',
          url: `${process.env.SALESFORCE_URL_LOGIN}/services/oauth2/token`,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
      });

      const { access_token, refresh_token, instance_url } = await tokenResponse.data;

      // Get expire date from token introspection end point.
      tokenObject.accessToken = access_token;
      const { exp } = await tokenIntrospection(tokenObject);

      return {
          accessToken: access_token,
          refreshToken: refresh_token ?? tokenObject.refreshToken,
          accessTokenExpires: exp,
          instanceUrl: instance_url
      };
  } catch (error) {
      return {
          error: "RefreshAccessTokenError",
      }
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
      async jwt({ token, account }) {
          // Initial sign in
          if (account) {
              // Set access and refresh token
              token.accessToken = account.access_token;
              token.refreshToken = account.refresh_token;
              token.instanceUrl = account.instance_url;

              // Get the Expire Date
              const { exp } = await tokenIntrospection(token);
              token.accessTokenExpires = exp;

              console.log('Use New Token...');
              return Promise.resolve(token);
          }

          // @ts-ignored
          if (Date.now() < (token.accessTokenExpires * 1000)) {
              console.log('Use Previous Token...');
              return Promise.resolve(token);
          }

          console.log('Use Refresh Token...');
          return Promise.resolve(await refreshAccessToken(token));
      }
  },
  providers: [
      SalesforceProvider({
          name: 'Salesforce',
          clientId: process.env.SALESFORCE_CLIENT_ID,
          clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
          idToken: true,
          wellKnown: `${process.env.SALESFORCE_URL_LOGIN}/.well-known/openid-configuration`,
          authorization: { params: { scope: 'openid api refresh_token' } },
          userinfo: {
              async request({ provider, tokens, client }) {
                  //@ts-ignored
                  return await client.userinfo(tokens, {
                      //@ts-ignored
                      params: provider.userinfo?.params,
                  });
              },
          },
          profile(profile) {
              return { id: profile.email, ...profile };
          }
      })
  ]
}

export default NextAuth(authOptions)
