'use client';

import { DataTable } from '@/components/ui/data-table';

import { columns } from './columns';
import { useList } from './use-list';

export function SynchronizationBackupsList() {
  const {
    response,
    handleDelete,
    handleEdit,
    handleAdd,
    isModalOpen,
    setIsModalOpen,
    synchronizationBackupId,
  } = useList();

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Sincronização e Cópia de Segurança</h1>
      {/* <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {synchronizationBackupId ? "Editar Usuário" : "Adicionar Usuário"}
            </DialogTitle>
          </DialogHeader>
          <SynchronizationBackupForm
            synchronizationBackupId={synchronizationBackupId}
            onSubmit={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog> */}

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
