'use client';
import { useState } from 'react';
// import { useState } from "next";
import { RefreshCcwIcon } from 'lucide-react';

import { useMailContext } from '@/contexts';
import { Button } from '../ui/button';
import { MailListingItem } from '../ui/mail-listing-item';
import { MailListingToolbox } from '../ui/mail-listing-toolbox';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { SelectEmailUsing } from '../ui/select-email-using';

type ChildrenProps = {
  nextUrl?: string;
  prevUrl?: string;
};

type Selected = {
  id: string;
  nextId?: string;
  prevId?: string;
};

interface Props {
  type: 'inputs' | 'outputs' | 'contacts';
  children: React.ReactNode;
}

export function MailsListingLayout(props: Props) {
  const { type, children } = props;
  const [select, setSelect] = useState<Selected | undefined>(undefined);
  const { handleSelectContent } = useMailContext();

  const title = {
    inputs: 'Caixa de Entrada',
    outputs: 'Caixa de Saída',
    contacts: 'Contactos',
  }[type];

  const count = 100;
  const countStr = count > 99 ? '99+' : count.toString();

  const contentListing = Array.from({ length: 100 }).map((_, key) => ({
    id: `${key}`,
    name: `Nome ${key}`,
    subject: `Assunto ${key}`,
    message: `Mensagem ${key}`,
    read: key % 2 === 0,
  }));

  const mainUrl = `/mails/${type}`;

  const handleSelect = (item: any, key: number) => {
    setSelect({ id: item.id, nextId: '', prevId: '' });

    const nextId = undefined;
    const prevId = undefined;
    const nextUrl = nextId ? `${mainUrl}/${nextId}` : undefined;
    const prevUrl = prevId ? `${mainUrl}/${prevId}` : undefined;

    handleSelectContent({ navigation: { nextUrl, prevUrl } });
  };

  return (
    <ResizablePanelGroup
      autoSaveId="cefrio.resizable.painel"
      direction="horizontal"
      className="w-full"
    >
      <ResizablePanel defaultSize={15} maxSize={30} minSize={10}>
        <div className="flex h-screen-custom flex-col ">
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
                  <div className="absolute -bottom-4 left-0">
                    <SelectEmailUsing value="cesar.lopes@cefrio.ao" />
                  </div>
                </div>
              </div>
            </div>
            <MailListingToolbox />
          </div>
          {/* Listing */}
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {contentListing.map((item, key) => (
              <MailListingItem
                key={key}
                name={item.name}
                subject={item.subject}
                message={item.message}
                select={select?.id === item?.id}
                read={item.read}
                href={`${mainUrl}/${item.id}`}
                onClick={() => handleSelect(item, key)}
              />
            ))}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle className='after:bg-gray-300 mx-[1px] after:w-[2px]' />
      <ResizablePanel>
        <div className="relative flex h-screen-custom flex-1 items-center justify-center overflow-y-auto">
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
