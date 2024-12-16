'use client';

import { PlusIcon, TrashIcon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toastResponseError } from '@/helpers/response/response';

import { cn } from '@/libs/utils';
import { PaymentMethod } from './method';

interface Props {
  onUpdate?(): void;
  control?: any;
  defaultAmount?: number;
  disabled?: boolean;
  className?: string;
  headerClassName?: string;
  paymentsClassName?: string;
}

export function InvoicePaymentsComponent(props: Props) {
  const {
    control,
    onUpdate,
    defaultAmount,
    disabled,
    className,
    headerClassName,
    paymentsClassName,
  } = props;
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'payments',
  });

  const handleSelectMethod = (index: number, payment: any, method: string) => {
    const paymentFound = fields?.find((payment: any) => payment.method === method);

    if (paymentFound) {
      toastResponseError('Já existe essa forma de pagamento na lista.');
      return;
    }

    update(index, { ...payment, method });
  };

  const handleAdd = () => {
    append({
      method: '',
      amount: fields.length === 0 ? defaultAmount || 0 : 0,
      paymentId: '',
      date: new Date(),
    });
  };

  console.log({ fields });

  return (
    <div className={cn('flex w-80 flex-col gap-4', className)}>
      <div className={cn('flex w-full items-center justify-between', headerClassName)}>
        <h2 className="text-lg font-semibold">Pagamentos</h2>
        <Button variant={'ghost'} onClick={handleAdd} className="h-8 w-8 gap-4 rounded-full p-0">
          <PlusIcon />
        </Button>
      </div>
      <div className={cn('flex w-full flex-col gap-4', paymentsClassName)}>
        {fields.map((payment: any, index) => (
          <div key={index} className="flex w-full flex-col gap-1">
            <div className="flex items-center gap-2">
              <PaymentMethod
                disabled={disabled}
                method={payment.method}
                onSelect={(method) => handleSelectMethod(index, payment, method)}
              />
              <Button
                type="button"
                variant={'ghost'}
                className="group h-6 w-6 p-0 hover:bg-transparent hover:text-red-500"
                onClick={() => remove(index)}
              >
                <TrashIcon />
              </Button>
            </div>
            <div className="flex w-full items-center gap-3">
              <FormField
                defaultValue={payment?.amount}
                control={control}
                name={`payments.${index}.amount`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!payment?.method || disabled}
                        min="0.00"
                        step="0.01"
                        type="number"
                        className="w-full text-right"
                        onBlur={() => onUpdate?.()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              defaultValue={payment?.date}
              name={`payments.${index}.date`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <DatePicker
                      disabled={!payment?.method || disabled}
                      className="w-full"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              defaultValue={payment?.observation}
              name={`payments.${index}.observation`}
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={!payment?.method || disabled}
                      placeholder="Observação"
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
