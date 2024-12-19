'use client';
import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { InputFormFieldControl } from '@/components/ui/form-fields';
import { Loading } from '@/components/ui/loading';

import { EmailAccountFormProps } from './types';
import { useEmailAccountForm } from './use-email-account-form';

export function EmailAccountForm(props: EmailAccountFormProps) {
  const { emailAccountId, onCancel } = props;
  const { isLoadingData, isSaving, form, handleSubmit } = useEmailAccountForm(props);

  if (isLoadingData) return <Loading />;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <InputFormFieldControl
            label="Email"
            control={form.control}
            name="email"
            isLoading={isSaving}
          />
        </div>
        <div>
          <InputFormFieldControl
            label="Palavra-Passe"
            control={form.control}
            name="password"
            isLoading={isSaving}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">{emailAccountId ? 'Salvar Alterações' : 'Adicionar'}</Button>
        </div>
      </form>
    </FormProvider>
  );
}
