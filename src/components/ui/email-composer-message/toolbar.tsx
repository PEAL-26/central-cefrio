import { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ImageIcon,
  Italic,
  List,
  Underline,
} from 'lucide-react';
import { Button } from '../button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';

interface Props {
  editor: Editor;
}

export function EmailComposerMessageToolbar(props: Props) {
  const { editor } = props;

  return (
    <div className="mb-3 w-full">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 border-r border-gray-200 pr-2">
          <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        <Select>
          <SelectTrigger className="w-[80px] border-0">
            <SelectValue placeholder="14" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="14">14</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="18">18</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-1 border-l border-r border-gray-200 px-2">
          <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
