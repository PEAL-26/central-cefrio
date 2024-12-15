import { useState } from "react";

import { printJS } from "@/libs/print-js";
import { invoicePrint } from "@/services/invoices";
import { toastResponseError } from "@/helpers/response/response";
import { useAppContext } from "@/contexts";

export function useInvoicePrint() {
  const { loading } = useAppContext();
  const [isShowModalPrint, setIsShowModalPrint] = useState(false);
  const [isPrintError, setIsPrintError] = useState(false);

  const onLoadingStart = () => {
    setIsPrintError(false);
    setIsShowModalPrint(false);
  };

  const onLoadingEnd = () => {
    if (isPrintError) return;

    setIsShowModalPrint(true);
  };

  const onError = () => {
    setIsShowModalPrint(true);
  };

  const onPrintDialogClose = () => {
    setIsPrintError(false);
    setIsShowModalPrint(false);
    loading.hide();
  };

  const handlePrintInvoice = async (invoiceId: string) => {
    try {
      loading.show();
      setIsShowModalPrint(false);
      const response = await invoicePrint(invoiceId);

      printJS?.({
        printable: response.pdf,
        type: "pdf",
        base64: true,
        showModal: isShowModalPrint,
        onLoadingStart,
        onLoadingEnd,
        onError,
        onPrintDialogClose,
      });
    } catch (error) {
      toastResponseError(error);
    } finally {
      loading.hide();
    }
  };

  return { handlePrintInvoice, isLoading: loading.visible };
}
