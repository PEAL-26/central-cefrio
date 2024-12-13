import { SettingsLayout } from "@/components/layouts";

export const metadata = {
  title: { default: "Configurações", template: "%s | Configurações" },
};

const sidebarNavItems = [
  {
    title: "Empresa",
    href: "/documents/settings/company",
  },
  {
    title: "Bancos",
    href: "/documents/settings/banks",
  },
];

export default function SettingsMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SettingsLayout items={sidebarNavItems}>{children}</SettingsLayout>;
}
