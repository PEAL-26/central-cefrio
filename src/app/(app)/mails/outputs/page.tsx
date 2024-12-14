import { Loading } from "@/components/ui/loading";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Caixa de Saída",
};

export default async function MailsOutputsPage() {
  return <Suspense fallback={<Loading />}>Caixa de Saída</Suspense>;
}
