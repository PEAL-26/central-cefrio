import { AppLayout } from '@/components/layouts';
import { MailProvider } from '@/contexts';

export default function AppMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppLayout>
      <MailProvider>{children}</MailProvider>
    </AppLayout>
  );
}
