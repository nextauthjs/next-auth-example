import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

// Default adapater uses TypeORM; see TypeORM documentation for options
// https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md
const adapater = {
  type: 'sqlite',
  database: ':memory:',

  // Synchronize schema with database
  // Use in development or on first run only; may result in data loss!
  synchronize: true 
}

const options = {
  site: process.env.SITE,
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
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
