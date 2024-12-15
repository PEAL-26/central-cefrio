"use client";
import { useState } from "react";
// import { useState } from "next";
import { RefreshCcwIcon } from "lucide-react";

import { Button } from "../ui/button";
import { MailListingToolbox } from "../ui/mail-listing-toolbox";
import { MailListingItem } from "../ui/mail-listing-item";

interface Props {
  type: "inputs" | "outputs" | "contacts";
  children: React.ReactNode;
}

export function MailsListingLayout(props: Props) {
  const { type, children } = props;
  const [select, setSelect] = useState("");

  const title = {
    inputs: "Caixa de Entrada",
    outputs: "Caixa de Saída",
    contacts: "Contactos",
  }[type];

  const count = 100;
  const countStr = count > 99 ? "99+" : count.toString();

  return (
    <div className="flex flex-1">
      <div className="flex flex-col w-60 border-r border-r-gray-300 shadow h-screen-custom top-16 bottom-6 fixed left-0">
        {/* Header */}
        <div>
          <div className="text-center px-2 border-b border-b-gray-200 w-full flex items-center gap-2 justify-center">
            <Button className="p-0 hover:bg-transparent" variant="ghost">
              <RefreshCcwIcon className="size-4 text-gray-300" />
            </Button>
            <span className="text-xs font-bold">{`${title} (${countStr})`}</span>
          </div>
          <MailListingToolbox />
        </div>
        {/* Listing */}
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {Array.from({ length: 100 }).map((_, key) => (
            <MailListingItem
              key={key}
              name={`Nome ${key}`}
              subject="Assunto"
              message="Mensagem"
              select={select === String(key)}
              read={key % 2 === 0}
              href={`/mails/${type}/${key}`}
              onClick={() => setSelect(String(key))}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center flex-1">{children}</div>
    </div>
  );
}
