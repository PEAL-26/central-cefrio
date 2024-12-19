'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';
import { MailsMessageDetailsToolbar } from './toolbar';

type MessageData = {};

interface Props {
  data: MessageData;
}

export function MailMessageDetails(props: Props) {
  const { data } = props;
  
  return (
    <>
      <MailsMessageDetailsToolbar />
      <div className="h-full flex-1 p-6 pt-14">
        {/* Header */}
        <div className="mt-6">
          <h1 className="mb-4 text-2xl font-bold">Assunto do Email</h1>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</p>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span>15 de junho de 2023, 14:30</span>
              <Button variant="ghost" size="sm">
                para mim <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <Separator className="my-4" />

        {/* Content */}
        <div className="prose max-w-none">
          <p>Olá,</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
            aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Sed vitae
            nisl euismod, aliquam nisl eget, aliquam nisl.
          </p>
          <p>
            Suspendisse potenti. Sed euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc,
            vitae aliquam nisl nunc vitae nisl. Sed vitae nisl euismod, aliquam nisl eget, aliquam
            nisl.
          </p>
          <p>
            Atenciosamente,
            <br />
            John Doe
          </p>
        </div>
      </div>
    </>
  );
}
