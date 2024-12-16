import { ChevronsUpDownIcon, LoaderIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

import { useState } from 'react';

interface Props {
  defaultRoute?: string;
}

export function AppDropdownMenu(props: Props) {
  const { defaultRoute } = props;
  const [app, setApp] = useState(() => defaultRoute);

  const selected = {
    mails: 'Emails',
    comercial: 'Comercial',
    undefined: 'Selecione app',
  }[app === 'mails' ? 'mails' : app === 'comercial' ? 'comercial' : 'undefined'];

  const isLoading = app !== '' && defaultRoute !== app;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="data-[state=open]:bg-muted flex h-8 w-44 items-center justify-between gap-3"
        >
          <div className="flex items-center gap-1">
            {selected}
            {isLoading && <LoaderIcon className="size-4 animate-spin text-gray-300" />}
          </div>
          <ChevronsUpDownIcon className="size-4 text-gray-300" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Link href="/comercial" onClick={() => setApp('comercial')}>
            Comercial
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/mails" onClick={() => setApp('mails')}>
            Emails
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
