import { useFieldArray, useFormContext } from "react-hook-form";
import { InvoiceItemSchemaType, InvoiceSchemaType } from "./schema";
import {
  invoiceUpdateItemTotal,
  invoiceUpdateResume,
} from "@/helpers/invoice-total-update";

export function useInvoiceUpdateTotal() {
  const form = useFormContext<InvoiceSchemaType>();

  const updateTotal = (index: number) => {
    const quantity = form.watch(`items.${index}.quantity`) ?? 0;
    const price = form.watch(`items.${index}.price`) ?? 0;
    const discount = form.watch(`items.${index}.discount`) ?? 0;
    const iva = form.watch(`items.${index}.iva`) ?? 0;

    const { discountAmount, ivaAmount, total } = invoiceUpdateItemTotal({
      quantity,
      price,
      discount,
      iva,
    });

    form.setValue(`items.${index}.discountAmount`, discountAmount);
    form.setValue(`items.${index}.ivaAmount`, ivaAmount);
    form.setValue(`items.${index}.total`, total);

    updateResume();
  };

  const updateResume = () => {
    const { subtotal, totalDiscount, totalIva, totalWithholdingTax, total } =
      invoiceUpdateResume({
        items: (form.watch("items") ?? []).map((item) => ({
          discountAmount: item?.discountAmount ?? 0,
          ivaAmount: item?.ivaAmount ?? 0,
          total: item?.total ?? 0,
        })),
        customerId: form.watch("customerId"),
        withholdingTaxPercentage: form.watch("withholdingTax")?.percentage,
      });

    form.setValue("subtotal", subtotal);
    form.setValue("totalDiscount", totalDiscount);
    form.setValue("totalIva", totalIva);
    form.setValue("totalWithholdingTax", totalWithholdingTax);
    form.setValue("total", total);
  };

  return {
    form,
    updateResume,
    updateTotal,
  };
}
