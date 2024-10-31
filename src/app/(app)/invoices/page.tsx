import { Metadata } from "next";
import { Suspense } from "react";
import { ListInvoices } from "../../../components/templates/invoices";
import { ReactLoading } from "@/libs/react-loading";

export const metadata: Metadata = {
  title: "Facturas",
};

export default function InvoiceListPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed z-50 inset-0 bg-black/50 h-screen flex justify-center items-center ">
          <ReactLoading
            type="spinningBubbles"
            color={"#FFF"}
            height={90}
            width={90}
          />
        </div>
      }
    >
      <ListInvoices />
    </Suspense>
  );
}
