import { SettingsLayout } from '@/components/layouts';

export const metadata = {
  title: { default: 'Configurações', template: '%s | Configurações' },
};

const sidebarNavItems = [
  {
    title: 'Usuários',
    href: '/settings/users',
  },
];

export default function SettingsMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-8">
      <SettingsLayout items={sidebarNavItems}>{children}</SettingsLayout>
    </div>
  );
}
