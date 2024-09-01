import { useFormContext } from "react-hook-form";
import { InvoiceSchemaType } from "./schema";
import { useEffect } from "react";

export function useInvoiceUpdateTotal() {
  const form = useFormContext<InvoiceSchemaType>();

  const updateResume = () => {
    const items = form.getValues("items");
    const subtotal = items?.reduce((total, item) => total + item.total, 0);
    const ivaTotal = items?.reduce((total, item) => total + item.ivaAmount, 0);
    const totalDiscount = items?.reduce(
      (total, item) => total + item.discountAmount,
      0
    );
    let withholdingTaxPercentage = 0;
    if (form.getValues("customerId")) {
      withholdingTaxPercentage =
        form.getValues("withholdingTax")?.percentage ?? 0;
    }
    const totalWithholdingTax = (subtotal * withholdingTaxPercentage) / 100;
    const total = subtotal - totalWithholdingTax;
    form.setValue("subtotal", subtotal);
    form.setValue("totalDiscount", totalDiscount);
    form.setValue("totalIva", ivaTotal);
    form.setValue("totalWithholdingTax", totalWithholdingTax);
    form.setValue("total", total);
  };

  // useEffect(() => {
  //   const items = form.watch("items");
  //   const subtotal = items?.reduce((total, item) => total + item.total, 0);
  //   const ivaTotal = items?.reduce((total, item) => total + item.ivaAmount, 0);
  //   const totalDiscount = items?.reduce(
  //     (total, item) => total + item.discountAmount,
  //     0
  //   );

  //   let withholdingTaxPercentage = 0;
  //   if (form.watch("customerId")) {
  //     withholdingTaxPercentage = form.watch("withholdingTax")?.percentage ?? 0;
  //   }

  //   const totalWithholdingTax = (subtotal * withholdingTaxPercentage) / 100;
  //   const total = subtotal - totalWithholdingTax;

  //   form.setValue("subtotal", subtotal);
  //   form.setValue("totalDiscount", totalDiscount);
  //   form.setValue("totalIva", ivaTotal);
  //   form.setValue("totalWithholdingTax", totalWithholdingTax);
  //   form.setValue("total", total);
  // }, [form]);

  return {
    form,
    updateResume,
  };
}
