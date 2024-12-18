import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/libs/utils';
import { BaseSyntheticEvent, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CustomerSchemaType } from './schema';

interface CreateEditCustomerFormProps {
  children: ReactNode;
  form: UseFormReturn<CustomerSchemaType>;
  isLoading?: boolean;
  onSubmit?(e?: BaseSyntheticEvent): void;
  formClassName?: string;
  addInvoice?: boolean;
}

export function CreateEditCustomerForm(props: CreateEditCustomerFormProps) {
  const { children, form, isLoading, onSubmit, formClassName, addInvoice = false } = props;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={cn('grid w-full gap-4', formClassName)}>
        <div className={cn('grid grid-cols-2 gap-6', addInvoice && 'w-full')}>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="taxpayer"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Contribuinte</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type="text" placeholder="0000000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={cn(addInvoice && 'col-span-2')}>
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type="text" placeholder="900 000 000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={cn(addInvoice && 'col-span-2')}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="LhXkT@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="LhXkT@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="123 Main St, Anytown USA"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {children}
      </form>
    </Form>
  );
}
