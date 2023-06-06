'use client';

import { SessionProvider } from 'next-auth/react';

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object
// We use client hydration to establish the <SessionProvider />
export default function AuthProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
