import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { toastResponseError, toastResponseSuccess } from '@/helpers/response/response';
import { customerAddContactService } from '@/services/customers/customer-add-contacts';
import { customerListContactService } from '@/services/customers/customer-list-contacts';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactsSchemaType, CustomerContactsSchemaType, customerContactsSchema } from './schema';

export function useCustomerContacts(customerId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<CustomerContactsSchemaType>({
    resolver: zodResolver(customerContactsSchema),
    mode: 'onChange',
    defaultValues: {
      contacts: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'contacts',
  });

  const handleSubmit = async (data: CustomerContactsSchemaType) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await customerAddContactService({ customerId, contacts: data.contacts });
      toastResponseSuccess('Contacto(s) adicionado(s) com sucesso.');
      handleChangeStateModal(false);
    } catch (error) {
      toastResponseError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeStateModal = (state: boolean) => {
    if (isLoading) return null;
    setIsModalOpen(state);
  };

  const handleAdd = () => {
    append({
      type: 'others',
      value: '',
    });
  };

  const handleUpdate = (index: number, data: Partial<ContactsSchemaType>) => {
    const contact = fields[index];
    update(index, { ...contact, ...data });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.reset(undefined);
    }
  }, [form, isModalOpen]);

  useEffect(() => {
    (async () => {
      setIsLoadingData(true);
      if (isModalOpen && customerId) {
        const response = await customerListContactService(customerId);

        form.setValue(
          'contacts',
          response.data.map((c) => ({
            id: c.id,
            type: c.type,
            value: c.value,
            main: c.main,
          })),
        );
      }
      setIsLoadingData(false);
    })();
  }, [form, customerId, isModalOpen]);

  return {
    form,
    isLoading,
    isLoadingData,
    handleSubmit: form.handleSubmit(handleSubmit),
    isModalOpen,
    setIsModalOpen,
    handleChangeStateModal,
    handleAdd,
    handleUpdate,
    handleRemove,
  };
}
