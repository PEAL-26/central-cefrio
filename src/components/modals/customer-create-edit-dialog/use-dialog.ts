import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { toastResponseError, toastResponseRegisterSuccess } from '@/helpers/response/response';

import { customerService } from '@/services/customers';
import { customerSchema, CustomerSchemaType } from './schema';
import { UseCustomerCreateEditDialogProps } from './types';

export function useCustomerCreateEdit(props?: UseCustomerCreateEditDialogProps) {
  const { id, open, onClose, onSubmitted } = props || {};
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['customer'],
    mutationFn: customerService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['customers'],
      });
      if (open) {
        toastResponseRegisterSuccess(id);
        onClose?.(false);
      }
    },
    onError: (error) => {
      toastResponseError(error);
    },
  });

  const form = useForm<CustomerSchemaType>({
    resolver: zodResolver(customerSchema),
    mode: 'onChange',
    defaultValues: {
      id,
      address: '',
      email: '',
      location: '',
      name: '',
      taxpayer: '',
      telephone: '',
    },
  });

  const handleSubmit = async (data: CustomerSchemaType) => {
    if (isPending) return;
    const response = await mutateAsync(data);
    onSubmitted?.(response);
  };

  const { data: customer, isLoading } = useQuery({
    queryFn: () => (id ? customerService.getById(id) : null),
    queryKey: ['customer', id],
  });

  useEffect(() => {
    if (!open) {
      form.reset(undefined);
    }
  }, [form, open]);

  useEffect(() => {
    if (id && customer) {
      form.setValue('id', customer.id);
      form.setValue('name', customer.name);
      form.setValue('address', customer?.address || '');
      form.setValue('location', customer?.location || '');
      form.setValue('taxpayer', customer?.taxpayer || '');
      form.setValue('telephone', customer?.telephone || '');
      form.setValue('email', customer?.email || '');
    }
  }, [id, customer, form]);

  return {
    form,
    isPending,
    isLoading,
    onSubmit: form.handleSubmit(handleSubmit),
  };
}
