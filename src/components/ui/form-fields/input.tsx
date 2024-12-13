import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> {
  label?: string;
  placeholder?: string;
  isLoading?: boolean;
  control?: Control<TFieldValues, TContext>;
  name: Path<TFieldValues>;
}

export function InputFormFieldControl<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>(props: Props<TFieldValues, TContext>) {
  const { label, placeholder, isLoading, control, name } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              disabled={isLoading}
              type="text"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
