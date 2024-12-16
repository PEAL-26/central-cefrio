import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { toastResponseError, toastResponseRegisterSuccess } from '@/helpers/response/response';
import { bankService } from '@/services/banks';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { bankSchema, BankSchemaType } from './schema';
import { BankFormProps } from './types';

export function useBankForm(props: BankFormProps) {
  const { bankId, onSubmit } = props;
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const form = useForm<BankSchemaType>({
    resolver: zodResolver(bankSchema),
    mode: 'onChange',
  });

  const queryClient = useQueryClient();
  const handleSubmit = async (data: BankSchemaType) => {
    if (isSaving) return;

    try {
      setIsSaving(true);

      await bankService.create({ ...data, id: bankId });
      queryClient.invalidateQueries({ queryKey: ['banks'] });
      toastResponseRegisterSuccess(bankId);
      onSubmit?.();
    } catch (error) {
      toastResponseError(error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoadingData(true);
      if (bankId) {
        const response = await bankService.getById(bankId);
        if (response) {
          form.setValue('id', bankId);
          form.setValue('name', response.name);
          form.setValue('abbreviation', response.abbreviation);
          form.setValue('account', response.account);
          form.setValue('iban', response?.iban);
          form.setValue('show', response?.show);
        }
      }
      setIsLoadingData(false);
    })();
  }, [bankId, form]);

  return {
    isLoadingData,
    isSaving,
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}
