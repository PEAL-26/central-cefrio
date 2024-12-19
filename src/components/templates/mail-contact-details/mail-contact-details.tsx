'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Briefcase, Mail, MapPin, Pencil, Phone, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Contact {
  id: number;
  type: string;
  value: string;
}

interface MainContact {
  name: string;
  taxpayer: string;
  address: string;
  location: string;
}

export function MailContactDetails() {
  const [mainContact, setMainContact] = useState<MainContact>({
    name: 'João Silva',
    taxpayer: '123.456.789-00',
    address: 'Rua das Flores, 123',
    location: 'São Paulo, SP',
  });

  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, type: 'Telefone', value: '(11) 98765-4321' },
    { id: 2, type: 'Email', value: 'joao.silva@email.com' },
  ]);

  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    type: 'Telefone',
    value: '',
  });
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const addContact = () => {
    if (newContact.value) {
      //   setContacts([...contacts, { ...newContact, id: Date.now() }]);
      setNewContact({ type: 'Telefone', value: '' });
    }
  };

  const updateContact = () => {
    if (editingContact) {
      setContacts(contacts.map((c) => (c.id === editingContact.id ? editingContact : c)));
      setEditingContact(null);
    }
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="h-full flex-1 p-6">
      <Card className="border-none shadow-none">
        <CardContent>
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <Avatar className="h-32 w-32">
              <AvatarImage src="https://github.com/shadcn.png" alt={mainContact.name} />
              <AvatarFallback>
                {mainContact.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="mb-2 text-3xl font-bold">{mainContact.name}</h1>
              <p className="mb-4 text-gray-500 dark:text-gray-400">{mainContact.taxpayer}</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>
                    {mainContact.address}, {mainContact.location}
                  </span>
                </div>
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-2">
                    {contact.type === 'Telefone' && <Phone className="h-4 w-4 text-gray-500" />}
                    {contact.type === 'Email' && <Mail className="h-4 w-4 text-gray-500" />}
                    {contact.type === 'Outro' && <Briefcase className="h-4 w-4 text-gray-500" />}
                    <span>{contact.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Separator className="my-4" />
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
          <CardTitle>Informações de Contato</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full p-0 w-8 h-8">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Contato</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-type" className="text-right">
                    Tipo
                  </Label>
                  <Select
                    value={newContact.type}
                    onValueChange={(value) => setNewContact({ ...newContact, type: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Telefone">Telefone</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-value" className="text-right">
                    Valor
                  </Label>
                  <Input
                    id="new-value"
                    value={newContact.value}
                    onChange={(e) => setNewContact({ ...newContact, value: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={addContact}>Adicionar Contato</Button>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <ul className="max-w-sm space-y-2">
            {contacts.map((contact) => (
              <li key={contact.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {contact.type === 'Telefone' && <Phone className="h-5 w-5 text-gray-500" />}
                  {contact.type === 'Email' && <Mail className="h-5 w-5 text-gray-500" />}
                  {contact.type === 'Outro' && <Briefcase className="h-5 w-5 text-gray-500" />}
                  <span>{contact.value}</span>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Contato</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-type" className="text-right">
                            Tipo
                          </Label>
                          <Select
                            value={editingContact?.type}
                            onValueChange={(value) =>
                              setEditingContact((prev) => (prev ? { ...prev, type: value } : null))
                            }
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Telefone">Telefone</SelectItem>
                              <SelectItem value="Email">Email</SelectItem>
                              <SelectItem value="Outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-value" className="text-right">
                            Valor
                          </Label>
                          <Input
                            id="edit-value"
                            value={editingContact?.value}
                            onChange={(e) =>
                              setEditingContact((prev) =>
                                prev ? { ...prev, value: e.target.value } : null,
                              )
                            }
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <Button onClick={updateContact}>Salvar Alterações</Button>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => deleteContact(contact.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
