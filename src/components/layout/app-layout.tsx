"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { ReactLoading } from "@/libs/react-loading";

import { UserNav } from "../ui/user-nav";
import { AppDropdownMenu } from "../ui/app-dropdown-menu";
import { DocumentsMainNav, MailsMainNav } from "../ui/navs";

type AppType = "mails" | "documents" | undefined;

export function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const route = pathname.split("/")[1];

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setIsLoadingPage(false);
  }, []);

  if (isLoadingPage) {
    return (
      <div className="flex-1 flex justify-center items-center h-screen">
        <ReactLoading
          type="spinningBubbles"
          color={"#1B3D7A"}
          height={90}
          width={90}
        />
      </div>
    );
  }

  return (
    <>
      <div className="border-b fixed inset-x-0 top-0 z-40 bg-white">
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
          {route === "mails" && <MailsMainNav className="mx-6" />}
          {route === "documents" && <DocumentsMainNav className="mx-6" />}
          <div className="ml-auto flex items-center space-x-4">
            <UserNav route={route} />
          </div>
        </div>
      </div>

      <main className="mt-16 overflow-y-auto h-screen-custom flex-1 mb-6 flex flex-col">
        {children}
      </main>
      <footer className="fixed inset-x-0 bg-primary-900 text-white bottom-0 z-50 py-1 px-6 flex items-center justify-center">
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
