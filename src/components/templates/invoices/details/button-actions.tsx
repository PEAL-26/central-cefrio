import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function ActionsButtons({ id }: { id: string }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/invoices/${id}/edit`}>Alterar</Link>
          </DropdownMenuItem>
          <DropdownMenuItem /*onClick={() => handlePrintInvoice()}*/>
            Imprimir
          </DropdownMenuItem>
          <DropdownMenuItem>Baixar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem /*onClick={() => setIsOpenDeleteModal(true)}*/>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <AlertModal
        open={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        onOk={() => actions?.onDelete?.(id || "")}
      /> */}
    </>
  );
}
