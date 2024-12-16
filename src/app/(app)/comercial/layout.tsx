import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Documents', template: '%s | Documents' },
};

export default function DocumentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex-1 p-8">{children}</div>;
}
