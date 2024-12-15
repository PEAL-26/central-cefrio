"use client";
import { useState } from "react";

import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  documentId: string;
}

export function AddPayment(props: Props) {
  const { documentId } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <Button
          variant="default"
          className=""
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar pagamento</DialogTitle>
        </DialogHeader>
        <></>
      </DialogContent>
    </Dialog>
  );
}
