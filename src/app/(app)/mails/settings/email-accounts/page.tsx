import { EmailAccountsList } from '@/components/templates/settings/email-accounts';
import { Loading } from '@/components/ui/loading';
import { Suspense } from 'react';

export const metadata = {
  title: 'Configurações de Contas de Email',
};

export default function SettingsEmailAccountsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <EmailAccountsList />
    </Suspense>
  );
}
