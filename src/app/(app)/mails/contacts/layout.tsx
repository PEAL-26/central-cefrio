import { MailsListingLayout } from "@/components/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Mails", template: "%s | Mails" },
};

export default function MailsMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MailsListingLayout type="contacts">{children}</MailsListingLayout>;
}
