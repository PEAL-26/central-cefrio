import { useState } from 'react';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

interface DateDayPickerProps {
  date?: Date;
  start?: Date;
  onChange?(date?: Date): void;
}

export function DateDayPicker(props: DateDayPickerProps) {
  const { onChange, date = new Date(), start } = props;

  const [selected, setSelected] = useState<Date>(() => date);

  const handleChange = (date: Date) => {
    setSelected(date);
    onChange?.(date);
  };

  return (
    <DayPicker
      mode="single"
      captionLayout="dropdown"
      selected={selected}
      onDayClick={handleChange}
      footer={
        <div className="flex justify-center">
          <span
            className="cursor-pointer hover:text-primary"
            onClick={() => handleChange(new Date())}
          >
            Hoje
          </span>
        </div>
      }
    />
  );
}
