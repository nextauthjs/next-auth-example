"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <Button {...props} onClick={() => signIn(provider)}>
      Sign In
    </Button>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <Button
      variant="ghost"
      className="w-full p-0"
      onClick={() => signOut()}
      {...props}
    >
      Sign Out
    </Button>
  );
}
