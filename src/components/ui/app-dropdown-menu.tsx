import Link from "next/link";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";
import { ChevronsDownUpIcon, ChevronsUpDownIcon } from "lucide-react";

import { useState } from "react";

interface Props {
  defaultRoute?: string;
}

export function AppDropdownMenu(props: Props) {
  const { defaultRoute } = props;
  const [app, setApp] = useState(() => defaultRoute);

  const selected = {
    mails: "Emails",
    documents: "Documentos",
    undefined: "Selecione um aplicativo",
  }[
    app === "mails" ? "mails" : app === "documents" ? "documents" : "undefined"
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex h-8 data-[state=open]:bg-muted items-center justify-between gap-3"
        >
          {selected}
          <ChevronsUpDownIcon className="size-4 text-gray-300" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Link href="/documents" onClick={() => setApp("documents")}>
            Documentos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/mails" onClick={() => setApp("mails")}>
            Emails
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
