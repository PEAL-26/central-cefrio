'use client';
import { useState } from 'react';
// import { useState } from "next";
import { RefreshCcwIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { MailListingItem } from '../ui/mail-listing-item';
import { MailListingToolbox } from '../ui/mail-listing-toolbox';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { SelectEmailUsing } from '../ui/select-email-using';

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
        <div className="mr-1 flex h-screen-custom flex-col border-r border-r-gray-300 shadow">
          {/* Header */}
          <div>
            <div className="flex h-14 w-full flex-col items-center gap-1 border-b border-b-gray-200 px-2 py-2 text-center">
              <div className="flex w-full items-center justify-center gap-2">
                <Button className="h-5 p-0 hover:bg-transparent" variant="ghost">
                  <RefreshCcwIcon className="size-4 text-gray-300" />
                </Button>
                <div className="relative">
                  <span className="text-xs font-bold">{`${title} (${countStr})`}</span>
                  {/* Apenas será visível quando o usuário tiver mais de 1 email vinculado a ele*/}
                  <div className="absolute left-0 -bottom-4">
                    <SelectEmailUsing value="cesar.lopes@cefrio.ao" />
                  </div>
                </div>
              </div>
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
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-screen-custom flex-1 items-center justify-center overflow-y-auto">
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
