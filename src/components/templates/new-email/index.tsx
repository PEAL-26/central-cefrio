'use client';

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Calendar,
  ImageIcon,
  Italic,
  List,
  Paperclip,
  Smile,
  Underline,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { MultiInput } from '../../ui/multi-input';

export default function EmailComposer() {
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
              {/* Formatting Toolbar */}
              <div className="w-full mb-3">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 border-r border-gray-200 pr-2">
                    <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                      <Underline className="h-4 w-4" />
                    </Button>
                  </div>

                  <Select>
                    <SelectTrigger className="w-[80px] border-0">
                      <SelectValue placeholder="14" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="14">14</SelectItem>
                      <SelectItem value="16">16</SelectItem>
                      <SelectItem value="18">18</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center space-x-1 border-l border-r border-gray-200 px-2">
                    <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Textarea
                placeholder="Digite sua mensagem formatada aqui"
                className="min-h-[200px]"
              />
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
