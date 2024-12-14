import { Circle, Search, Settings2Icon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

type Filter = {};

interface Props {
  onEdit?: () => void;
  onSearch?: (text: string) => void;
  onFilter?: (filters: Filter) => void;
}

export function MailListingToolbox(props: Props) {
  const {} = props;
  return (
    <div className="border-b w-full flex items-center justify-between py-1 px-2">
      <Button variant="ghost" className="p-0 h-5 w-5 hover:bg-transparent">
        <Circle className="text-gray-300 size-3" />
      </Button>
      <div className="flex items-center gap-1 justify-center w-fit">
        <Search className="text-gray-300 size-4" />
              <Input
                  type='search'
          className="p-0 h-4 w-24 border-none text-xs rounded-none"
          placeholder="Pesquisar"
        />
      </div>
      <Button
        variant="ghost"
        className="p-0 h-5 flex items-center text-xs text-gray-500 hover:bg-transparent hover:text-gray-700 w-fit gap-1"
      >
        <Settings2Icon className="text-gray-300 size-4" />
        Filtro
      </Button>
    </div>
  );
}
