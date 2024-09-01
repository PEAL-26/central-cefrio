import { ProductSchemaType } from "./product";

export interface CreateEditProductDialogProps {
  open?: boolean;
  onClose?(state: boolean): void;
  id?: string;
}

export interface UseCreateEditProductDialogProps {
  open?: boolean;
  onClose?(state: boolean): void;
  id?: string;
  onSubmitted?(product: ProductSchemaType): void;
}
