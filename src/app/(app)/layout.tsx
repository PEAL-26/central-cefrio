import { AppLayout } from "@/components/layouts";

export default function AppMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
