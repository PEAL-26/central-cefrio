'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebounceValue, useGetSearchParams, useSetSearchParams } from '@/hooks';
import { cn } from '@/libs/utils';

type OnAdd = () => void;
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onAdd?: string | OnAdd;
}

export function DataTableToolbar<TData>({ table, onAdd }: DataTableToolbarProps<TData>) {
  const { setParams } = useSetSearchParams();
  const [q, size] = useGetSearchParams({ params: ['q', 'size'] });
  const [search, setSearch] = useState(q || '');
  const isFiltered = search.trim().length > 0;
  const debounced = useDebounceValue(search?.trim());

  const setParamsSearch = useCallback(() => {
    setParams([
      { name: 'q', value: debounced },
      { name: 'page', value: debounced ? '1' : '' },
      { name: 'size', value: size },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    setParamsSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const reset = () => {
    setSearch('');
    table.resetColumnFilters();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Pesquisar..."
          value={search}
          onChange={(event) => setSearch(String(event.target.value))}
          className="placeholder-muted-foreground h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button variant="ghost" onClick={reset} className="h-8 px-2 lg:px-3">
            Limpar filtro
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <AddButton onAdd={onAdd} />
    </div>
  );
}

function AddButton({ onAdd }: { onAdd?: string | OnAdd }) {
  if (!onAdd) return null;

  if (typeof onAdd === 'string') {
    return (
      <Link className={cn(buttonVariants({ variant: 'default' }), 'h-8')} href={onAdd}>
        Adicionar
      </Link>
    );
  }

  return (
    <Button className="h-8" onClick={onAdd}>
      Adicionar
    </Button>
  );
}
