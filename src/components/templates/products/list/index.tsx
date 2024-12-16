'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

import { CreateEditProductDialog } from '../../../modals/product-create-edit-dialog';
import { columns } from './columns';
import { useList } from './use-list';

export function ListProducts() {
  const { response, handleOpenDialog, id, isOpenDialog, setIsOpenDialog, handleDelete } = useList();

  return (
    <>
      <div className="flex h-full flex-col space-y-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Produtos\Serviços</h2>
            <p className="text-muted-foreground">Listagem de produtos\serviços</p>
          </div>

          <Button onClick={() => handleOpenDialog()}>Novo</Button>
        </div>
        <DataTable
          response={response}
          columns={columns({
            onEdit: handleOpenDialog,
            onDelete: handleDelete,
          })}
        />
      </div>
      <CreateEditProductDialog id={id} onClose={setIsOpenDialog} open={isOpenDialog} />
    </>
  );
}
