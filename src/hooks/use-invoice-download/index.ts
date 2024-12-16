import { useAppContext } from '@/contexts';
import { downloadBase64JVB } from '@/helpers/download';
import { toastResponseError } from '@/helpers/response/response';
import { invoicePrint } from '@/services/invoices';

export function useInvoiceDownload() {
  const { loading } = useAppContext();

  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      loading.show();
      const { pdf } = await invoicePrint(invoiceId);
      await downloadBase64JVB(pdf);
    } catch (error) {
      toastResponseError(error);
    } finally {
      loading.hide();
    }
  };

  return { handleDownloadInvoice, isLoading: loading.visible };
}
