'use client';

import { DataTable } from '@/components/ui/data-table';

import { columns } from './columns';
import { useList } from './use-list';

export function UsersList() {
  const { response, handleDelete, handleEdit, handleAdd, isModalOpen, setIsModalOpen, userId } =
    useList();

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Configurações de Usuários</h1>
      {/* <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {userId ? "Editar Usuário" : "Adicionar Usuário"}
            </DialogTitle>
          </DialogHeader>
          <UserForm
            userId={userId}
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
