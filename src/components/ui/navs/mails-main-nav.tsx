'use client';

import Link from 'next/link';
import { HTMLAttributes } from 'react';

import { cn } from '@/libs/utils';
import { MailIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '../button';
import { activeLink } from './utils';

const LINKS = [
  { href: '/mails/inputs', label: 'Caixa de Entrada' },
  { href: '/mails/outputs', label: 'Caixa de Saida' },
  { href: '/mails/contacts', label: 'Contactos' },
];

export function MailsMainNav(props: HTMLAttributes<HTMLElement>) {
  const { className, ...rest } = props;

  const pathname = usePathname();

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...rest}>
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(activeLink(link.href, pathname), 'relative')}
        >
          {link.label}
          {link.href === '/mails/inputs' && (
            <div className="absolute -right-4 -top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-center text-[5pt] text-white font-bold">
              1
            </div>
          )}
        </Link>
      ))}
      {/* TODO: DROPDOWN Com mais opções */}
      <Link
        href="/mails/new"
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'gap-2 bg-primary-100 hover:bg-primary-300',
        )}
      >
        <MailIcon className="size-4" />
        Novo E-mail
      </Link>
    </nav>
  );
}
