import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useDocumentSettings } from "./use-document-settings";
import {
  DOCUMENT_TYPES,
  DOCUMENTS_INCLUDE,
  DOCUMENTS_NOT_INCLUDE,
  DOCUMENTS_WITH_PAYMENT,
  PAYMENT,
} from "@/constants/document-types";
import { cn } from "@/libs/utils";
import { useState } from "react";
import { useInvoiceUpdateTotal } from "../use-invoice-update-total";

export function InvoiceType() {
  const [open, setOpen] = useState(false);

  const { form, updateDocumentNumber } = useDocumentSettings();
  const { updateResume } = useInvoiceUpdateTotal();

  const type = DOCUMENT_TYPES.find(
    (doc) => doc.code === form.getValues("type")
  );

  const handleSelect = (typeCode: string) => {
    form.setValue("type", typeCode);
    updateDocumentNumber(typeCode);
    setOpen(false);

    if (!DOCUMENTS_WITH_PAYMENT.includes(typeCode)) {
      form.setValue("payments", []);
    }

    if (!DOCUMENTS_INCLUDE.includes(typeCode)) {
      form.setValue("documents", []);
    }

    if (DOCUMENTS_INCLUDE.includes(typeCode)) {
      form.setValue("items", []);
    }

    if (PAYMENT.includes(typeCode)) {
      form.setValue("dueDate", undefined);
      form.setValue("paymentTerms", undefined);
    }

    updateResume();
  };

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger className="flex gap-2 items-center line-clamp-1">
        <span
          className={cn(
            "flex-1 flex gap-2 items-center line-clamp-1 whitespace-nowrap",
            !type?.name && "text-gray-400"
          )}
        >
          {type?.name || "Selecione o tipo de doc."}
        </span>
        <ChevronDownIcon className="text-gray-400" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <div className="flex flex-col">
          {DOCUMENT_TYPES.filter(
            (filter) => !DOCUMENTS_NOT_INCLUDE.includes(filter.code)
          ).map((doc, key) => (
            <span
              key={key}
              className="hover:bg-gray-100 p-1 pr-14 rounded cursor-pointer"
              onClick={() => handleSelect(doc.code)}
            >
              {doc.name}
            </span>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
