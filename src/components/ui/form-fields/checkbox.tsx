import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Checkbox } from "../checkbox";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> {
  label?: string;
  isLoading?: boolean;
  control?: Control<TFieldValues, TContext>;
  name: Path<TFieldValues>;
  align?: "left" | "right";
}

export function CheckboxFormFieldControl<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>(props: Props<TFieldValues, TContext>) {
  const { label, isLoading, control, name, align = "left" } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full gap-2 items-center flex">
          {label && align === "right" && (
            <FormLabel className="mt-0" style={{ marginTop: 0 }}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Checkbox
              disabled={isLoading}
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
            />
          </FormControl>
          {label && align === "left" && (
            <FormLabel className="mt-0" style={{ marginTop: 0 }}>
              {label}
            </FormLabel>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
