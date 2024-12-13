"use client";

import Link from "next/link";
import { HTMLAttributes } from "react";

import { cn } from "@/libs/utils";
import { usePathname } from "next/navigation";
import { activeLink } from "./utils";

const LINKS = [
  { href: "/mails/inputs", label: "Caixa de Entrada" },
  { href: "/mails/outputs", label: "Caixa de Saida" },
  { href: "/mails/contacts", label: "Contactos" },
];

export function MailsMainNav(props: HTMLAttributes<HTMLElement>) {
  const { className, ...rest } = props;

  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...rest}
    >
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={activeLink(link.href, pathname)}
        >
          {link.label}
        </Link>
      ))}
      {/* TODO: DROPDOWN Com mais opções */}
      <Link href={"/mails/new"}>Novo email</Link>
    </nav>
  );
}
