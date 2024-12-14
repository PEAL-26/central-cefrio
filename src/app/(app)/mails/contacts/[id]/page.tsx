import { Loading } from "@/components/ui/loading";
import { getItemCached } from "@/helpers/cache";
import { invoiceService } from "@/services/invoices";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  return {
    // title: invoice?.number || "",
  };
}

export default async function MailsContactDetailsPage(props: Props) {
  return <Suspense fallback={<Loading />}>Detalhes do contacto</Suspense>;
}
