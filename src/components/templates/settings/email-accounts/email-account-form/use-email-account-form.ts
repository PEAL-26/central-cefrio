import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { toastResponseError, toastResponseRegisterSuccess } from '@/helpers/response/response';
import { emailAccountService } from '@/services/email-accounts';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { EmailAccountSchemaType, emailAccountSchema } from './schema';
import { EmailAccountFormProps } from './types';

export function useEmailAccountForm(props: EmailAccountFormProps) {
  const { emailAccountId, onSubmit } = props;
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const form = useForm<EmailAccountSchemaType>({
    resolver: zodResolver(emailAccountSchema),
    mode: 'onChange',
  });

  const queryClient = useQueryClient();
  const handleSubmit = async (data: EmailAccountSchemaType) => {
    if (isSaving) return;

    try {
      setIsSaving(true);

      await emailAccountService.create({
        ...data,
        id: emailAccountId,
        userIds: data?.users?.map((u) => u.id),
      });
      queryClient.invalidateQueries({ queryKey: ['email-accounts'] });
      toastResponseRegisterSuccess(emailAccountId);
      onSubmit?.();
    } catch (error) {
      toastResponseError(error);
    } finally {
      setIsSaving(false);
    }
  };

  const onInvalid = (err: any) => {
    console.log(err);
  };

  useEffect(() => {
    (async () => {
      setIsLoadingData(true);
      if (emailAccountId) {
        const response = await emailAccountService.getById(emailAccountId);
        if (response) {
          form.setValue('id', emailAccountId);
          form.setValue('email', response.email);
          form.setValue('password', response.password);
          form.setValue('users', response.users);
        }
      }
      setIsLoadingData(false);
    })();
  }, [emailAccountId, form]);

  return {
    isLoadingData,
    isSaving,
    form,
    handleSubmit: form.handleSubmit(handleSubmit, onInvalid),
  };
}
