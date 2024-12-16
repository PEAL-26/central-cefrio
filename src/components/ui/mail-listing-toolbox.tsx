import { Circle, Search, Settings2Icon } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

type Filter = {};

interface Props {
  onEdit?: () => void;
  onSearch?: (text: string) => void;
  onFilter?: (filters: Filter) => void;
}

export function MailListingToolbox(props: Props) {
  const {} = props;
  return (
    <div className="flex w-full items-center justify-between border-b px-2 py-1">
      <Button variant="ghost" className="h-5 w-5 p-0 hover:bg-transparent">
        <Circle className="size-3 text-gray-300" />
      </Button>
      <div className="flex w-fit items-center justify-center gap-1">
        <Search className="size-4 text-gray-300" />
        <Input
          type="search"
          className="h-4 w-24 rounded-none border-none p-0 text-xs"
          placeholder="Pesquisar"
        />
      </div>
      <Button
        variant="ghost"
        className="flex h-5 w-fit items-center gap-1 p-0 text-xs text-gray-500 hover:bg-transparent hover:text-gray-700"
      >
        <Settings2Icon className="size-4 text-gray-300" />
        Filtro
      </Button>
    </div>
  );
}
