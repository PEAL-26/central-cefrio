'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ReactLoading } from '@/libs/react-loading';

import { AppDropdownMenu } from '../ui/app-dropdown-menu';
import { ComercialMainNav, MailsMainNav } from '../ui/navs';
import { UserNav } from '../ui/user-nav';

type AppType = 'mails' | 'comercial' | undefined;

export function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const route = pathname.split('/')[1];

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setIsLoadingPage(false);
  }, []);

  if (isLoadingPage) {
    return (
      <div className="flex h-screen flex-1 items-center justify-center">
        <ReactLoading type="spinningBubbles" color={'#1B3D7A'} height={90} width={90} />
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 border-b bg-white">
        <div className="flex h-16 items-center px-4">
          <Link href={`/${route}`} className="relative mr-4">
            <Image
              src="/logo.png"
              alt="cefrio-logo"
              className="h-8 w-auto"
              width={115.2}
              height={32}
            />
          </Link>
          <AppDropdownMenu defaultRoute={route} />
          {route === 'mails' && <MailsMainNav className="mx-6" />}
          {route === 'comercial' && <ComercialMainNav className="mx-6" />}
          <div className="ml-auto flex items-center space-x-4">
            <UserNav route={route} />
          </div>
        </div>
      </div>

      <main className="mb-6 mt-16 flex h-screen-custom flex-1 flex-col overflow-y-auto">
        {children}
      </main>
      <footer className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center bg-primary-900 px-6 py-1 text-white">
        <p className="text-xs">
          {`© ${new Date().getFullYear()} `}
          <Link
            className="font-medium hover:underline"
            href="https://pealsystems.com"
            target="_blank"
          >
            PEALSystems
          </Link>
          {`. Todos direitos reservados.`}
        </p>
      </footer>
    </>
  );
}
