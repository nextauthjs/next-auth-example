# NextAuth Example

https://next-auth-example.now.sh

## About NextAuth Example

This is an example of how to use NextAuth v2 library to add authenticaiton to a website created with [Next.js](https://nextjs.org).

NextAuth v2 is very easy to implement, full-stack (client/server) open source authentication library designed for [Serverless](https://now.sh) and [Next.js](https://nextjs.org) (but can be used with other frameworks).

* [NextAuth v2 Announcement](https://github.com/iaincollins/next-auth/issues/99)
* [How to clone / contribute to NextAuth](https://github.com/iaincollins/next-auth/issues/105)

## Beta Software

**NextAuth v2 is beta software and is not ready for production use.**

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

Alternatively (or in addition), you can configure an SMTP server for passwordless sign in via email.

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

    now env add GOOGLE_ID production
    now env add GOOGLE_SECRET production