import { SettingsLayout } from '@/components/layouts';

export const metadata = {
  title: { default: 'Configurações', template: '%s | Configurações' },
};

const sidebarNavItems = [
  {
    title: 'Contas de Email',
    href: '/mails/settings/email-accounts',
  },
  {
    title: 'Usuários',
    href: '/mails/settings/users',
  },
];

export default function SettingsMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 p-8">
      <SettingsLayout items={sidebarNavItems}>{children}</SettingsLayout>;
    </div>
  );
}
