"use client";
import Link from "next/link";
import { ReactLoading } from "@/libs/react-loading";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";
import { useList } from "./use-list";
import { buttonVariants } from "@/components/ui/button";

export function ListInvoices() {
  const { response, handleDelete } = useList();

  return (
    <div className="flex-col space-y-8 flex h-full">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Facturas</h2>
          <p className="text-muted-foreground">Listagem de facturas emitidas</p>
        </div>

        <Link
          className={buttonVariants({ variant: "default" })}
          href="/invoices/create"
        >
          Emitir
        </Link>
      </div>
      <DataTable
        response={response}
        columns={columns({
          onDelete: handleDelete,
        })}
      />
    </div>
  );
}
