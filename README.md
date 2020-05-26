# NextAuth.js Example

[next-auth-example.now.sh](https://next-auth-example.now.sh)

## About This Project

This is an example of how to use NextAuth.js library to add authentication to a [Next.js](https://nextjs.org) application.

## About NextAuth.js

**NextAuth.js v2 is beta software and is not ready for production use yet.**

NextAuth.js is an easy to implement, full-stack (client/server) open source authentication library designed for [Next.js](https://nextjs.org) and [Serverless](https://now.sh).

* Go to [next-auth.js.org](https://next-auth.js.org) for documentation
* Go to [NextAuth.js v2 Announcement](https://github.com/iaincollins/next-auth/issues/99) for more information about the release of NextAuth.js v2

*NextAuth.js is not associated with Vercel or Next.js.*

## Getting Started

### 1. Clone the repository and install dependancies

```
git clone https://github.com/iaincollins/next-auth-example.git
cd next-auth-example
npm i
```

### 2. Copy `example.env` to `.env`

Add details for one or more providers (e.g. Google, Twitter, GitHub, Email, etc).

```
cp example.env .env
```

When configuring your database you should also install an appropriate node_module.

e.g.

* **SQLite**

  Install module:
  `npm i sqlite3`

  Database URI:
  `sqlite://localhost/:memory:?synchronize=true`

* **MySQL**

  Install module:
  `npm i mysql`

  Database URI:
  `mysql://username:password@127.0.0.1:3306/database_name?synchronize=true`

* **Postgres**

  Install module:
  `npm i pg`

  Database URI:
  `postgres://username:password@127.0.0.1:5432/database_name?synchronize=true`

* **MongoDB**

  Install module:
  `npm i mongo`

  Database URI:
  `mongodb://username:password@127.0.0.1:27017/database_name?synchronize=true`

Notes:

* The example .env specifies an in-memory SQLite database that does not persist data.
* SQLite is suitable for development / testing but not for production.
* The option `?synchronize=true` automatically syncs schema changes to the database. It should not be used in production as may result in data loss if there are changes to the schema or to NextAuth.js
* You can also specify a [TypeORM connection object](https://typeorm.io/#/connection-options) in `pages/api/auth/[...slug.js]` instead of a database URL / connection string.

### 3. Configure authentication providers

* Review and update options in `pages/api/auth/[...slug.js]` as needed.

* When setting up OAUTH, in the developer admin page for each of your OAuth services, you should configure the callback URL to use a callback path of `{your server}/api/auth/callback/{provider}`.

  e.g. For Google: `http://localhost:3000/api/auth/callback/google`

  A list of configured providers and their callback URLs is available from the endpoint `/api/auth/providers`. You can find more information at https://next-auth.js.org/providers

* You can also choose to specify an SMTP server for passwordless sign in via email.

### 4. Start the application

To run your site locally, use:

```
npm run dev
```

To run it it production mode, use:

```
npm build
npm start
```

Note: You will also need environment variables set up in your production environment.

To do this in `now.sh` you can use the `now env` command:

    now env add DATABASE_URL production

Before deploying to production, be sure to set environment variables for the ID and Secrets for all your authentication providers.
