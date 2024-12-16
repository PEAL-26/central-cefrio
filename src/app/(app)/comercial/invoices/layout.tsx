import { InvoiceProvider } from '@/contexts/invoice-context';

export default function InvoiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <InvoiceProvider>{children}</InvoiceProvider>;
}
