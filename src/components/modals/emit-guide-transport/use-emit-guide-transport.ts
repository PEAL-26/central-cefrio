import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { toastResponseError, toastResponseSuccess } from '@/helpers/response/response';
import { invoiceService } from '@/services/invoices';

export function useEmitGuidePayment(documentId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
  const [observation, setObservation] = useState('');

  const router = useRouter();
  const handleSubmit = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      if (
        new Date(new Date().toISOString().split('T')[0] + 'T00:00:00').getTime() >
        deliveryDate.getTime()
      ) {
        throw new Error('Não pode selecionar uma data passada.');
      }

      const document = await invoiceService.getById(documentId);
      if (!document) {
        throw new Error('Documento não encontrado.');
      }

      const response = await invoiceService.create({
        type: 'GR',
        customerId: document?.customer?.id,
        date: new Date(),
        deliveryDate,
        reference: document.number,
        observation,
        items:
          document.products?.map((item) => ({
            productId: item.product.id || '',
            name: item.productName,
            price: item.price,
            unitMeasure: item?.unitMeasure,
            quantity: item.quantity,
            discount: item.discount ?? 0,
            iva: item.iva ?? 0,
            reasonExemption: item.reasonExemption,
          })) || [],
      });

      toastResponseSuccess('Guia de Transporte\\Remessa emitida com sucesso.');
      router.push(`/comercial/invoices/${response.id}`);
      handleChangeStateModal(false);
    } catch (error) {
      toastResponseError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeStateModal = (state: boolean) => {
    if (isLoading) return null;
    setIsModalOpen(state);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setDeliveryDate(new Date());
      setObservation('');
    }
  }, [isModalOpen]);

  return {
    isLoading,
    deliveryDate,
    handleSubmit,
    isModalOpen,
    setIsModalOpen,
    handleChangeStateModal,
    setDeliveryDate,
    observation,
    setObservation,
  };
}
