import { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Mails", template: "%s | Mails" },
};

export default function MailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
