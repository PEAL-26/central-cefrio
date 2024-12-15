import { Loading } from "@/components/ui/loading";
import { MailUnselected } from "@/components/ui/mail-unselected";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Contactos",
};

export default async function MailsContactsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MailUnselected type="contacts" />
    </Suspense>
  );
}
