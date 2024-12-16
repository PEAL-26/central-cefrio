'use client';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/libs/utils';
import { X } from 'lucide-react';
import { KeyboardEvent, useState } from 'react';

interface MultiEmailInputProps {
  id?: string;
  placeholder?: string;
  label?: string;
  labelClassName?: string;
  multiEmail?: boolean;
}

export function MultiInput(props: MultiEmailInputProps) {
  const { id, placeholder, label, labelClassName, multiEmail = false } = props;
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const addEmail = (email: string) => {
    if (email && isValidEmail(email) && !emails.includes(email)) {
      setEmails([...emails, email]);
      setInputValue('');
    }
  };

  const removeEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();
      addEmail(inputValue.trim());
    }
  };

  return (
    <div className="flex w-full items-center gap-2 border-b">
      {label && (
        <label
          htmlFor={id}
          className={cn('block text-sm font-medium text-gray-700', labelClassName)}
        >
          {label}:
        </label>
      )}
      <div className="flex w-full flex-row items-center gap-2 overflow-x-auto">
        {multiEmail &&
          emails.map((email, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex h-fit items-center gap-1 rounded-md py-1 text-xs"
            >
              {email}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeEmail(index)} />
            </Badge>
          ))}
        <Input
          id={id}
          type="email"
          placeholder={emails.length === 0 ? placeholder : ''}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addEmail(inputValue.trim())}
          className="flex-grow border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}
