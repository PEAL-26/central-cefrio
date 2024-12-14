"use client";

import Link from "next/link";
import { HTMLAttributes } from "react";

import { cn } from "@/libs/utils";
import { usePathname } from "next/navigation";
import { activeLink } from "./utils";

const LINKS = [
  { href: "/comercial", label: "Dashboard" },
  { href: "/comercial/invoices", label: "Documentos" },
  { href: "/comercial/products", label: "Serviços" },
  { href: "/comercial/customers", label: "Clientes" },
];

export function ComercialMainNav(props: HTMLAttributes<HTMLElement>) {
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
    </nav>
  );
}
