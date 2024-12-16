import { SettingsLayout } from '@/components/layouts';

export const metadata = {
  title: { default: 'Configurações', template: '%s | Configurações' },
};

const sidebarNavItems = [
  {
    title: 'Empresa',
    href: '/mails/settings/company',
  },
  {
    title: 'Bancos',
    href: '/mails/settings/banks',
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
  return <SettingsLayout items={sidebarNavItems}>{children}</SettingsLayout>;
}
