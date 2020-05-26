import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  site: process.env.SITE,
  providers: [
    Providers.Email({
      // Configure with an SMTP connection string or an object for nodemailer https://nodemailer.com/
      server: process.env.EMAIL_SERVER, 
      // Email services often only allow sending email from a valid/verified address
      from: process.env.EMAIL_FROM,
    }),
    // When configuring oAuth providers you will need to make sure you get permission to request
    // the users email address to be able to verify their identity
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Providers.Twitch({
      clientId: process.env.TWITCH_ID,
      clientSecret: process.env.TWITCH_SECRET
    }),
  ],
  // The 'database' option should be a TypeORM configuration object
  // https://typeorm.io/#/connection-options
  //
  // Note: You will need to install the appropriate node_module!
  database: {
    type: process.env.DATABASE_TYPE, // e.g. mysql | postgres | mongodb | sqlite
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true // Automatically sync DB schema. Do not use in production.
  },

  // Additional options
  //
  // sessionMaxAge: 30*24*60*60*1000, // Expire sessions after 30 days of being idle
  // sessionUpdateAge: 24*60*60*1000, // Update session expiry only if session was updated more recently than the last 24 hours
  // verificationMaxAge: 24*60*60*1000, // Expire verification links (for email sign in) after 24 hours
  //
  // debug: true, // Use this option to enable debug messages in the console
}

export default (req, res) => NextAuth(req, res, options)
