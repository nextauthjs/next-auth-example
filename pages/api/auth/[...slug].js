import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

// Default adapater uses TypeORM; see TypeORM documentation for options
// https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md
const adapater = {
  type: 'sqlite',
  database: ':memory:',

  // Synchronize schema with database (automatically creates tables/collections)
  // Use in development or on first run only; may result in data loss!
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
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
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
  adapter: Adapters.Default(adapater),
}

export default (req, res) => NextAuth(req, res, options)
