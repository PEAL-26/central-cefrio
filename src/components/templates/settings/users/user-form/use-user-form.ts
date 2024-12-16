import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { toastResponseError, toastResponseRegisterSuccess } from '@/helpers/response/response';
import { userService } from '@/services/users';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { userSchema, UserSchemaType } from './schema';
import { UserFormProps } from './types';

export function useUserForm(props: UserFormProps) {
  const { userId, onSubmit } = props;
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  });

  const queryClient = useQueryClient();
  const handleSubmit = async (data: UserSchemaType) => {
    if (isSaving) return;

    try {
      setIsSaving(true);

      // await userService.create({ ...data, id: userId });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toastResponseRegisterSuccess(userId);
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
      if (userId) {
        const response = await userService.getById(userId);
        // if (response) {
        //   form.setValue("id", userId);
        //   form.setValue("name", response.name);
        //   form.setValue("abbreviation", response.abbreviation);
        //   form.setValue("account", response.account);
        //   form.setValue("iban", response?.iban);
        //   form.setValue("show", response?.show);
        // }
      }
      setIsLoadingData(false);
    })();
  }, [userId, form]);

  return {
    isLoadingData,
    isSaving,
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}
