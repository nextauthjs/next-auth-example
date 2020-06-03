import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  site: process.env.SITE,
  providers: [
    Providers.Email({
      // SMTP connection string or nodemailer configuration object https://nodemailer.com/
      server: process.env.EMAIL_SERVER, 
      // Email services often only allow sending email from a valid/verified address
      from: process.env.EMAIL_FROM,
    }),
    // When configuring oAuth providers make sure you enabling requesting
    // permission to get the users email address (required to sign in)
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
    })
  ],
  // The 'database' option should be a connection string or TypeORM
  // configuration object https://typeorm.io/#/connection-options
  //
  // Note: You need to install an appropriate node_module for your database
  database: process.env.DATABASE_URL,

  // Use JSON Web Tokens instead of database sessions
  jwt: true,

  // Additional options
  //
  // secret: 'abcdef123456789' // Recommended. Used to encode data and to sign cookies. Auto-generated if not specified.
  // sessionMaxAge: 30*24*60*60*1000, // Expire sessions after 30 days of being idle
  // sessionUpdateAge: 24*60*60*1000, // Update session expiry only if session was updated more recently than the last 24 hours
  // verificationMaxAge: 24*60*60*1000, // Expire verification links (for email sign in) after 24 hours
  // debug: true, // Use this option to enable debug messages in the console
}

export default (req, res) => NextAuth(req, res, options)
