import { auth, signIn, signOut } from "auth"
import { Button } from "./ui/button"
import { redirect } from "next/navigation"

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  )
}

export async function SignOut(
  props: React.ComponentPropsWithRef<typeof Button>
) {
  const session = await auth()

  // This redirect has to be in the list of allowed post_logout_redirect_uris in the OAuth2 Client.
  const redirectTo = "http://localhost:3000/"
  const oidcLogout =
    process.env.ORY_SDK_URL +
    `/oauth2/sessions/logout?id_token_hint=${session?.idToken}&post_logout_redirect_uri=${redirectTo}`
  return (
    <form
      action={async () => {
        "use server"
        await signOut({
          redirect: false,
        })
        redirect(oidcLogout)
      }}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  )
}
