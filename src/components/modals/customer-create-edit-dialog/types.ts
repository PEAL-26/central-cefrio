import { CustomerSchemaType } from './customer';

export interface CustomerCreateEditDialogProps {
  open?: boolean;
  onClose?(state: boolean): void;
  id?: string;
}

export interface UseCustomerCreateEditDialogProps {
  open?: boolean;
  onClose?(state: boolean): void;
  id?: string;
  onSubmitted?(customer: CustomerSchemaType): void;
}
