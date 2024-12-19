import { SynchronizationBackupsList } from '@/components/templates/settings';
import { Loading } from '@/components/ui/loading';
import { Suspense } from 'react';

export const metadata = {
  title: 'Sincronização e Cópia de Segurança',
};

export default function SettingsBanksPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SynchronizationBackupsList />
    </Suspense>
  );
}
