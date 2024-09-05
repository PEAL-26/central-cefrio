import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/libs/utils";
import { DateDayPicker } from "@/components/ui/date-day-picker";

interface DatePickerProps {
  value?: Date;
  onChange?(date: Date): void;
}

export function DatePicker(props: DatePickerProps) {
  const { value, onChange } = props;
  const [open, setOpen] = useState(false);

  const handleChangeDate = (date?: Date) => {
    if (date) {
      onChange?.(date);
      setOpen(false);
    }
  };

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger>
        <span className={cn("flex gap-2 items-center")}>
          {value ? value.toLocaleDateString(): 'Selecione a data'}
          <ChevronDownIcon className="text-gray-400" />
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <DateDayPicker date={value} onChange={handleChangeDate} />
      </PopoverContent>
    </Popover>
  );
}
