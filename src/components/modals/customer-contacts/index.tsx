'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { Loader2Icon, PlusIcon, TrashIcon } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { ContactSelect } from './contact-select';
import { useCustomerContacts } from './use-customer-contacts';

interface Props {
  customerId: string;
  customerName: string;
  className?: string;
}

export function CustomerContacts(props: Props) {
  const { customerId, customerName, className } = props;
  const {
    form,
    isModalOpen,
    isLoading,
    isLoadingData,
    handleSubmit,
    handleAdd,
    handleRemove,
    handleUpdate,
    handleChangeStateModal,
    setIsModalOpen,
  } = useCustomerContacts(customerId);

  const contacts = form.watch('contacts');

  console.log(contacts);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleChangeStateModal} modal>
      <DialogTrigger
        asChild
        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-primary-100 hover:text-primary-900"
      >
        <span onClick={() => setIsModalOpen(true)}>Contactos</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="line-clamp-1">
            Contactos{' | '}
            {customerName}
          </DialogTitle>
        </DialogHeader>
        {isLoadingData && <Loading />}
        {!isLoadingData && (
          <>
            {contacts.length === 0 && (
              <div className="flex items-center justify-center py-4">
                Nenhum contacto encontrado!
              </div>
            )}
            <FormProvider {...form}>
              {contacts.length > 0 && (
                <div className="flex flex-col gap-1">
                  {contacts.map((contact, key) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className="flex w-full items-center overflow-hidden rounded-md border border-gray-200">
                        <ContactSelect
                          type={contact.type}
                          onChange={(type) => handleUpdate(key, { type })}
                        />
                        <Input
                          disabled={isLoading}
                          value={contact.value}
                          placeholder="Contacto"
                          className="h-7 flex-1 border-none"
                          onChange={(e) => handleUpdate(key, { value: e.currentTarget.value })}
                        />
                      </div>
                      <Button
                        variant="outline"
                        disabled={isLoading}
                        onClick={() => handleRemove(key)}
                        className="h-8 w-8 border-none p-0 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <TrashIcon className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-center">
                <Button
                  variant="outline"
                  disabled={isLoading}
                  onClick={handleAdd}
                  className="h-8 w-8 rounded-full p-0"
                >
                  <PlusIcon className="size-4" />
                </Button>
              </div>
              <div className="mt-5 flex items-center justify-end gap-2">
                <Button
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="flex items-center gap-2"
                >
                  {isLoading && <Loader2Icon className="size-4 animate-spin" />}
                  Guardar
                </Button>
                <Button
                  disabled={isLoading}
                  className="bg-red-500 hover:bg-red-700"
                  onClick={() => handleChangeStateModal(false)}
                >
                  Cancelar
                </Button>
              </div>
            </FormProvider>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
