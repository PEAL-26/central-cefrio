import { SettingsLayout } from "@/components/layouts";

export const metadata = {
  title: { default: "Configurações", template: "%s | Configurações" },
};

const sidebarNavItems = [
  {
    title: "Empresa",
    href: "/comercial/settings/company",
  },
  {
    title: "Bancos",
    href: "/comercial/settings/banks",
  },
  {
    title: "Usuários",
    href: "/comercial/settings/users",
  },
];

export default function SettingsMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SettingsLayout items={sidebarNavItems}>{children}</SettingsLayout>;
}
