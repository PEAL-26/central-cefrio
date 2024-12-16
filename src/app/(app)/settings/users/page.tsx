import { UsersList } from '@/components/templates/settings';
import { Loading } from '@/components/ui/loading';
import { Suspense } from 'react';

export const metadata = {
  title: 'Configurações de Usuários',
};

export default function SettingsBanksPage() {
  return (
    <Suspense fallback={<Loading />}>
      <UsersList />
    </Suspense>
  );
}
