# NextAuth Example

## About NextAuth Example

This is an example of how to use [NextAuth v2](https://www.npmjs.com/package/next-auth) in a [Next.js](https://nextjs.org) app.

It comes with a [TypeORM configuration](https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md) in `adapater.config.js` for an SQLlite in-memory database.

* [NextAuth v2 Announcement](https://github.com/iaincollins/next-auth/issues/99)
* [How to clone / contribute](https://github.com/iaincollins/next-auth/issues/105)

## Beta Software

**NextAuthv2 is beta software and is not ready for production use.**

NextAuthv2 software is beta software; it is incomplete and contains bugs.

*NextAuth is designed for Next.js, it is not associated with Next.js or Vercel.*

## Getting Started

1. Clone the repository and install dependancies:

```
git clone https://github.com/iaincollins/next-auth-example.git
cd next-auth-example
npm i
```

2. Copy `example.env` to `.env` and add details for one or more providers.

```
cp example.env .env
```

In the developer area for your oAuth app, you should configure the callback URL to use your website with a callback path of `/api/auth/callback/google` (e.g. `http://localhost:3000/api/auth/callback/google` for Google).

A list of configured providers and their callback URLs is avalible from the endpoint `/api/auth/providers`.

3. To run your site locally, use:

```
npm run dev
```

To run it it production mode, use:

```
npm build
npm start
```
