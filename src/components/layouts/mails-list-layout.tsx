'use client';
import { useState } from 'react';
// import { useState } from "next";
import { RefreshCcwIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { MailListingItem } from '../ui/mail-listing-item';
import { MailListingToolbox } from '../ui/mail-listing-toolbox';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';

interface Props {
  type: 'inputs' | 'outputs' | 'contacts';
  children: React.ReactNode;
}

export function MailsListingLayout(props: Props) {
  const { type, children } = props;
  const [select, setSelect] = useState('');

  const title = {
    inputs: 'Caixa de Entrada',
    outputs: 'Caixa de Saída',
    contacts: 'Contactos',
  }[type];

  const count = 100;
  const countStr = count > 99 ? '99+' : count.toString();

  return (
    <ResizablePanelGroup
      autoSaveId="cefrio.resizable.painel"
      direction="horizontal"
      className="w-full"
    >
      <ResizablePanel defaultSize={15} maxSize={30} minSize={10}>
        <div className="flex h-screen-custom flex-col border-r border-r-gray-300 shadow mr-1">
          {/* Header */}
          <div>
            <div className="flex w-full items-center justify-center gap-2 border-b border-b-gray-200 px-2 text-center">
              <Button className="p-0 hover:bg-transparent" variant="ghost">
                <RefreshCcwIcon className="size-4 text-gray-300" />
              </Button>
              <span className="text-xs font-bold">{`${title} (${countStr})`}</span>
            </div>
            <MailListingToolbox />
          </div>
          {/* Listing */}
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
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
      </ResizablePanel>
      <ResizableHandle  />
      <ResizablePanel>
        <div className="flex h-screen-custom flex-1 items-center justify-center overflow-y-auto">
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
