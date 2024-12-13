import { InvoiceDetails } from "@/components/templates/invoices";
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
  const invoice = await getItemCached(() => invoiceService.getById(id));

  return {
    title: invoice?.number || "",
  };
}

export default async function InvoiceDetailsPage(props: Props) {
  const {
    params: { id },
  } = props;
  if (!id) return notFound();

  const invoice = await getItemCached(() => invoiceService.getById(id));
  if (!invoice) return notFound();

  return (
    <Suspense fallback={<Loading />}>
      <InvoiceDetails invoice={invoice} />
    </Suspense>
  );
}
