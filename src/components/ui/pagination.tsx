import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface Navigation {
  totalItems?: number;
  currentPage?: number;
  totalPages?: number;
  next?: number | null;
  prev?: number | null;
  size?: number;
  setPage?(page: number): void;
  nextPage?(): void;
  prevPage?(): void;
  setSizePerPage?(size?: number): void;
}

interface Show {
  totalItems?: boolean;
  size?: boolean;
  currentTotalPages?: boolean;
  nextPage?: boolean;
  lastPage?: boolean;
  prevPage?: boolean;
  fiestPage?: boolean;
}

interface Props {
  show?: Show;
  navigation?: Navigation;
}

export function Pagination(props: Props) {
  const { show, navigation } = props;

  return (
    <div className="flex items-center justify-between px-2">
      {show?.totalItems && (
        <div className="text-muted-foreground flex-1 text-sm">
          {`${navigation?.totalItems || 0} Item(s)`}
        </div>
      )}
      <div className="flex items-center space-x-6 lg:space-x-8">
        {show?.size && (
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Items por página</p>
            <Select
              value={String(navigation?.size || '10')}
              onValueChange={(value) => {
                navigation?.setSizePerPage?.(Number(value) === 10 ? undefined : Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={String(navigation?.size || '10')} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center space-x-2">
          {show?.fiestPage && (
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => navigation?.setPage?.(1)}
              disabled={!navigation?.prev}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
          )}
          {show?.prevPage && (
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => navigation?.prevPage?.()}
              disabled={!navigation?.prev}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          )}
          {show?.currentTotalPages && (
            <div className="flex items-center justify-center px-2 text-sm font-medium">
              {navigation?.currentPage || 0}/{navigation?.totalPages || 0}
            </div>
          )}
          {show?.nextPage && (
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => navigation?.nextPage?.()}
              disabled={!navigation?.next}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          )}
          {show?.lastPage && (
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() =>
                navigation?.totalPages ? navigation?.setPage?.(navigation?.totalPages) : undefined
              }
              disabled={!navigation?.next}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
