"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BankForm } from "./bank-form";

type Bank = {
  id: string;
  name: string;
  code: string;
};

const initialBanks: Bank[] = [
  { id: "1", name: "Banco A", code: "001" },
  { id: "2", name: "Banco B", code: "002" },
  { id: "3", name: "Banco C", code: "003" },
];

export function BankList() {
  const [banks, setBanks] = useState<Bank[]>(initialBanks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const handleAddBank = (newBank: Omit<Bank, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setBanks([...banks, { ...newBank, id }]);
    setIsModalOpen(false);
  };

  const handleEditBank = (updatedBank: Bank) => {
    setBanks(
      banks.map((bank) => (bank.id === updatedBank.id ? updatedBank : bank))
    );
    setIsModalOpen(false);
  };

  const handleDeleteBank = (id: string) => {
    setBanks(banks.filter((bank) => bank.id !== id));
  };

  const openEditModal = (bank: Bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="mb-4">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedBank(null)}>
              Adicionar Banco
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedBank ? "Editar Banco" : "Adicionar Banco"}
              </DialogTitle>
            </DialogHeader>
            <BankForm
              bank={selectedBank}
              onSubmit={selectedBank ? handleEditBank : handleAddBank}
              onCancel={() => setIsModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banks.map((bank) => (
            <TableRow key={bank.id}>
              <TableCell>{bank.name}</TableCell>
              <TableCell>{bank.code}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => openEditModal(bank)}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteBank(bank.id)}
                >
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
