"use client";

import Link from "next/link";
import Image from "next/image";

import { UserNav } from "../ui/user-nav";
import { DocumentsMainNav } from "../ui/navs/documents-main-nav";
import { usePathname } from "next/navigation";

export function MailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1">
      <div className="flex flex-col h-full w-60 border-r border-r-gray-300 shadow">
        Lista de emails
      </div>
      <div className="flex justify-center items-center flex-1">{children}</div>
    </div>
  );
}
