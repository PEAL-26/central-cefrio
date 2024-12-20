import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { CONTACT_TYPES, getContactType } from '@/constants/contantc-types';

interface Props {
  type?: string;
  onChange?(type: string): void;
}

export function ContactSelect(props: Props) {
  const { type = 'others', onChange } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex h-8 w-fit items-center gap-2 rounded-l-md rounded-r-none bg-gray-200 px-2 text-xs hover:bg-gray-300 hover:text-black"
        >
          {getContactType(type)?.icon} {getContactType(type)?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="h-[300px] overflow-y-auto">
        {CONTACT_TYPES.map((contact) => (
          <DropdownMenuItem
            key={contact.type}
            className="flex items-center gap-2"
            onClick={() => onChange?.(contact.type)}
          >
            {contact.icon}
            {contact.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
