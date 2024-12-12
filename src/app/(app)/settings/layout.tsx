import { SidebarNav } from "@/components/ui/sidebar-nav";

export const metadata = {
  title: { default: "Configurações", template: "%s | Configurações" },
};

const sidebarNavItems = [
  {
    title: "Empresa",
    href: "/settings/company",
  },
  {
    title: "Bancos",
    href: "/settings/banks",
  },
];

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="-mx-4 lg:w-1/5">
        <SidebarNav items={sidebarNavItems} />
      </aside>
      <div className="flex-1 lg:max-w-2xl">{children}</div>
    </div>
  );
}
