import { SidebarNav } from '@/components/ui/sidebar-nav';

export function SettingsLayout({
  children,
  items,
}: Readonly<{
  children: React.ReactNode;
  items: { title: string; href: string }[];
}>) {
  return (
    <div className="flex h-full flex-1 flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="-mx-4 lg:w-1/5">
        <SidebarNav items={items} />
      </aside>
      <div className="flex flex-1 flex-col lg:max-w-2xl">{children}</div>
    </div>
  );
}
