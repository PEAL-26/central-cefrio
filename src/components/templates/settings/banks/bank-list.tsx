'use client';

import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { BankForm } from './bank-form';
import { columns } from './columns';
import { useList } from './use-list';

export function BankList() {
  const { response, handleDelete, handleEdit, handleAdd, isModalOpen, setIsModalOpen, bankId } =
    useList();

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{bankId ? 'Editar Banco' : 'Adicionar Banco'}</DialogTitle>
          </DialogHeader>
          <BankForm
            bankId={bankId}
            onSubmit={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <DataTable
        response={response}
        onAdd={handleAdd}
        columns={columns({
          onDelete: handleDelete,
          onEdit: handleEdit,
        })}
      />
    </>
  );
}
