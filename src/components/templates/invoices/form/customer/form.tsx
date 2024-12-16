import {
  CreateEditCustomerForm,
  useCustomerCreateEdit,
} from '@/components/modals/customer-create-edit-dialog';
import { Button } from '@/components/ui/button';

interface CustomerFormProps {
  onSubmitted?(customerId: string): void;
  onBack?(): void;
}

export function CustomerForm(props: CustomerFormProps) {
  const { onBack, onSubmitted } = props;
  const { form, onSubmit, isLoading, isPending } = useCustomerCreateEdit({
    onSubmitted(customer) {
      onSubmitted?.(customer?.id || '');
    },
  });

  return (
    <CreateEditCustomerForm
      form={form}
      isLoading={isLoading || isPending}
      formClassName="grid-cols-1 w-full p-4"
      addInvoice
    >
      <div className="col-span-2 flex items-center justify-center gap-2 pb-4">
        <Button
          disabled={isLoading || isPending}
          variant="link"
          onClick={onBack}
          className="hover:no-underline"
        >
          Voltar
        </Button>
        <Button disabled={isLoading || isPending} onClick={onSubmit}>
          Salvar
        </Button>
      </div>
    </CreateEditCustomerForm>
  );
}
