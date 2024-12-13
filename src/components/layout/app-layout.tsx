"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { ReactLoading } from "@/libs/react-loading";

import { UserNav } from "../ui/user-nav";
import { MainNav } from "../ui/main-nav";

const APP = {
  mails: [],
  documents: [],
};

export function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [app, setApp] = useState<keyof typeof APP>("documents");

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
          <Link href="/" className="relative ">
            <Image
              src="/logo.png"
              alt="cefrio-logo"
              className="h-8 w-auto"
              width={115.2}
              height={32}
            />
          </Link>
          
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>

      <main className="mt-16 overflow-y-auto h-screen-custom flex-1 p-8 mb-6 flex flex-col">
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
