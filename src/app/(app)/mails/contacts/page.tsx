import { Loading } from "@/components/ui/loading";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Contactos",
};

export default async function MailsContactosPage() {
  return <Suspense fallback={<Loading />}>Contactos</Suspense>;
}
