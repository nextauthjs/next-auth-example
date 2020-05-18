import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

// Default adapater uses TypeORM; see TypeORM documentation for options
// https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md
//
// The `synchronize: true` option automatically creates tables/collections.
// You should use this in development or on first run only as it may result
// in data loss if used in production.
const database = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true 
}

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
  adapter: Adapters.Default(database),
}

export default (req, res) => NextAuth(req, res, options)
