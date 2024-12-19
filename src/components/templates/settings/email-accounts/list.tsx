'use client';

import { DataTable } from '@/components/ui/data-table';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { columns } from './columns';
import { EmailAccountForm } from './email-account-form';
import { useList } from './use-list';

export function EmailAccountsList() {
  const {
    response,
    handleDelete,
    handleEdit,
    handleAdd,
    isModalOpen,
    setIsModalOpen,
    emailAccountId,
  } = useList();

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Configurações de Contas de Email</h1>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {emailAccountId ? 'Editar Conta de Email' : 'Adicionar Conta de Email'}
            </DialogTitle>
          </DialogHeader>
          <EmailAccountForm
            emailAccountId={emailAccountId}
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
