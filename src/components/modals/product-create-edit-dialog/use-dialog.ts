import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { toastResponseError, toastResponseRegisterSuccess } from '@/helpers/response/response';
import { useQueryGetDataCached } from '@/hooks';

import { productService } from '@/services/products';
import { productSchema, ProductSchemaType } from './product';
import { UseCreateEditProductDialogProps } from './types';

export function useCreateEditProduct(props: UseCreateEditProductDialogProps) {
  const { id, open, onClose, onSubmitted } = props;
  const queryClient = useQueryClient();
  const { getDataCached } = useQueryGetDataCached();

  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['product'],
    mutationFn: productService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      if (open) {
        toastResponseRegisterSuccess(id);
        onClose?.(false);
      }
    },
    onError: (error) => {
      toastResponseError(error);
    },
  });

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: { id, name: '', unitMeasure: 'un' },
  });

  const handleSubmit = async (data: ProductSchemaType) => {
    if (isPending) return;
    try {
      const response = await mutateAsync(data);
      onSubmitted?.(response);
    } catch (error) {
      toastResponseError(error);
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset({
        id: undefined,
        name: '',
      });
    }
    if (id && open) {
      setIsLoading(true);
      const response = getDataCached(id, ['products']);
      if (response) {
        form.setValue('id', response.id);
        form.setValue('name', response.name);
        form.setValue('price', response?.price);
        form.setValue('unitMeasure', response?.unitMeasure);
        form.setValue('iva', response?.iva);
      }
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, open]);

  return {
    form,
    isPending,
    isLoading,
    onSubmit: form.handleSubmit(handleSubmit),
  };
}
