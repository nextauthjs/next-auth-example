# NextAuth.js Example

https://next-auth-example.now.sh

## About NextAuth.js Example

This is an example of how to use NextAuth.js library to add authentication to a [Next.js](https://nextjs.org) application.

NextAuth.js is an easy to implement, full-stack (client/server) open source authentication library designed for [Serverless](https://now.sh) and [Next.js](https://nextjs.org).

See [NextAuth.js v2.0 Announcement](https://github.com/iaincollins/next-auth/issues/99) for updates.

*NextAuth.js is not associated with Vercel or Next.js.*

## Beta Software

**NextAuth.js v2 is beta software and is not ready for production use yet.**

## Getting Started

1. Clone the repository and install dependancies.

```
git clone https://github.com/iaincollins/next-auth-example.git
cd next-auth-example
npm i
```

2. Copy `example.env` to `.env` and add details for one or more providers.

```
cp example.env .env
```

When configuring your database, you should also install an appropriate node_module.

e.g.

* For SQLite (type: 'sqlite'): `npm i sqlite3`
* For MySQL (type: 'mysql'): `npm i mysql`
* For Postgres (type: 'P'): `npm i pg`
* For MongoDB (type: 'mongodb'): `npm i mongo`

_The example .env specifies an in-memory sqlite database that does not persist data._

3. Configure authentication providers in `pages/api/auth/[...slug.js]`

In the developer admin page for each of your OAuth services, you should configure the callback URL to use a callback path of `{your server}/api/auth/callback/{provider}`.

e.g. For Google: `http://localhost:3000/api/auth/callback/google`

A list of configured providers and their callback URLs is avalible from the endpoint `/api/auth/providers`.

You can also choose to configure an SMTP server for passwordless / magic link sign in via email.

3. To run your site locally, use:

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

    now env add DATABASE_TYPE production
    now env add DATABASE_HOST production
    now env add DATABASE_PORT production
    now env add DATABASE_USERNAME production
    now env add DATABASE_PASSWORD production
    now env add DATABASE_NAME production

Before deploying to production, be sure to set environment variables for the ID and Secrets for all your authentication providers.
