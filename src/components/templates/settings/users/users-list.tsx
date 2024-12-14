"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/ui/data-table";

import { UserForm } from "./user-form";
import { useList } from "./use-list";
import { columns } from "./columns";

export function UsersList() {
  const {
    response,
    handleDelete,
    handleEdit,
    handleAdd,
    isModalOpen,
    setIsModalOpen,
    userId,
  } = useList();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Configurações de Usuários</h1>
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
