'use client';

import { Button } from '@/components/ui/button';
import { InputFormFieldControl } from '@/components/ui/form-fields';
import { Loader2 } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { useLogin } from './use-login';

interface Props {
  csrfToken?: string;
}

export function LoginScreenComponent(props: Props) {
  const { csrfToken } = props;
  const { form, isLoading, onSubmit } = useLogin();

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={onSubmit}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <div className="space-y-2">
          <InputFormFieldControl
            isLoading={isLoading}
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
          />
        </div>
        <div className="space-y-2">
          <InputFormFieldControl
            isLoading={isLoading}
            control={form.control}
            name="password"
            label="Senha"
            type="password"
            placeholder="••••••••"
          />
        </div>
        {/* <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-brand text-sm hover:text-brand-secondary"
          >
            Esqueceu a senha?
          </Link>
        </div> */}
        <Button disabled={isLoading} type="submit">
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          Entrar
        </Button>
      </form>
    </FormProvider>
  );
}
