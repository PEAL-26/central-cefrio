import './globals.css';

import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';

import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/contexts';
import { nextAuthOptions } from '@/libs/next-auth';
import { cn } from '@/libs/utils';
import { NextAuthSessionProvider, QueryClientProvider } from '@/providers';
import { colors } from '@/styles/colors';

import { inter } from './fonts';

export const metadata: Metadata = {
  title: { default: 'Cefrio', template: '%s | Cefrio' },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);
  return (
    <html lang="pt">
      <body className={cn(inter.className, 'overflow-hidden')}>
        <NextTopLoader
          color={colors.primary.DEFAULT}
          initialPosition={0.08}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow={`0 0 10px ${colors.primary.DEFAULT},0 0 5px ${colors.primary.DEFAULT}`}
          zIndex={99999999999999}
        />
        <NuqsAdapter>
          <QueryClientProvider>
            <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
              <NextAuthSessionProvider session={session}>
                <AppProvider>
                  {children}
                  <Toaster />
                </AppProvider>
              </NextAuthSessionProvider>
            </PrimeReactProvider>
          </QueryClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
