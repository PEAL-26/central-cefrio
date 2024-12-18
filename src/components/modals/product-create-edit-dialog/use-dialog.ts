import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { toastResponseError, toastResponseRegisterSuccess } from '@/helpers/response/response';

import { productService } from '@/services/products';
import { productSchema, ProductSchemaType } from './schema';
import { UseCreateEditProductDialogProps } from './types';

export function useCreateEditProduct(props: UseCreateEditProductDialogProps) {
  const { id, open, onClose, onSubmitted } = props;
  const queryClient = useQueryClient();

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

  const { data: product, isLoading } = useQuery({
    queryFn: () => (id ? productService.getById(id) : null),
    queryKey: ['product', id],
  });

  useEffect(() => {
    if (!open) {
      form.reset(undefined);
    }
  }, [form, open]);

  useEffect(() => {
    if (id && product) {
      form.setValue('id', product.id);
      form.setValue('name', product.name);
      form.setValue('price', product?.price || 0);
      form.setValue('unitMeasure', product?.unitMeasure || 'un');
      form.setValue('iva', product?.iva || 0);
    }
  }, [id, product, form]);

  return {
    form,
    isPending,
    isLoading,
    onSubmit: form.handleSubmit(handleSubmit),
  };
}
