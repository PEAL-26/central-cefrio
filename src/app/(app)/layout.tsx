import { AppLayout } from "@/components/layout";

export default function AppMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
