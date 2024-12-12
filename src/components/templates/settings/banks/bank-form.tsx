"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Bank = {
  id: string;
  name: string;
  code: string;
};

type BankFormProps = {
  bank?: Bank | null;
  onSubmit: (bank: Bank | Omit<Bank, "id">) => void;
  onCancel: () => void;
};

export function BankForm({ bank, onSubmit, onCancel }: BankFormProps) {
  const [name, setName] = useState(bank?.name || "");
  const [code, setCode] = useState(bank?.code || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bank) {
      onSubmit({ ...bank, name, code });
    } else {
      onSubmit({ name, code });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome do Banco</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="code">Código do Banco</Label>
        <Input
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {bank ? "Salvar Alterações" : "Adicionar Banco"}
        </Button>
      </div>
    </form>
  );
}
