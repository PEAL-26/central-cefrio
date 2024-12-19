'use client';

import { Calendar, Paperclip, Smile } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { EmailComposerMessage } from '@/components/ui/email-composer-message';
import { MultiInput } from '../../ui/multi-input';

export function EmailComposer() {
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Novo E-mail</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-4">
            <MultiInput id="to" placeholder="destinatario@exemplo.com" label="Para" multiEmail />
            <div className="flex space-x-4">
              <div className="flex-1">
                <MultiInput id="cc" placeholder="cc@exemplo.com" label="Cc" multiEmail />
              </div>
              <div className="flex-1">
                <MultiInput id="bcc" placeholder="bcc@exemplo.com" label="Bcc" multiEmail />
              </div>
            </div>
            <div>
              <MultiInput
                id="subject"
                placeholder="Assunto do email"
                label="Assunto"
                labelClassName="text-black"
              />
            </div>
            <div>
              <EmailComposerMessage />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col p-0">
        <div className="flex w-full items-center justify-between border-t border-gray-200 p-2">
          <Button>Enviar</Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
              <Smile className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
