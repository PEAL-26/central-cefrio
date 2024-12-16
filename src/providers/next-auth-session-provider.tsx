'use client';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface NextAuthSessionProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

export function NextAuthSessionProvider(props: NextAuthSessionProviderProps) {
  const { children, session } = props;

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
