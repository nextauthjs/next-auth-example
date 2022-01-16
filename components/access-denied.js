import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <Link
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}
        >
          <a>You must be signed in to view this page</a>
        </Link>
      </p>
    </>
  )
}
