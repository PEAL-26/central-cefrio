import {
  CreateEditProductForm,
  useCreateEditProduct,
} from '@/components/modals/product-create-edit-dialog';
import { Button } from '@/components/ui/button';
import { ProductListResponseData } from '@/services/products';

interface Props {
  onSubmitted?(product: ProductListResponseData): void;
  onBack?(): void;
}

export function ProductForm(props: Props) {
  const { onSubmitted, onBack } = props;
  const { form, onSubmit, isLoading, isPending } = useCreateEditProduct({
    onSubmitted: (product) => {
      onSubmitted?.({
        id: product.id || '',
        name: product.name,
        iva: product.iva,
        price: product.price,
        unitMeasure: product.unitMeasure,
      });
    },
  });

  return (
    <CreateEditProductForm
      form={form}
      isLoading={isLoading || isPending}
      formClassName="flex flex-col w-full p-4"
      addInvoice
    >
      <div className="flex items-center justify-center gap-2 pb-4">
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
    </CreateEditProductForm>
  );
}
