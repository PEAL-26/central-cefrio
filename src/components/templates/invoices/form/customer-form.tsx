"use client";
import { Label } from "@/components/ui/label";
import { Input, inputClassName } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "@/components/ui/autocomplete";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { BoltIcon } from "lucide-react";

export function CustomerForm() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
    console.log(event.query);
    setItems(
      Array.from({ length: 10 }).map((item) => event.query + "-" + item)
    );
  };

  return (
    <div className="flex flex-col max-w-lg w-72">
      <div className="flex justify-between items-center w-full gap-4 border-b">
        <h2 className="text-lg font-semibold">Cliente</h2>
        <Button variant="ghost" className="p-0 hover:bg-transparent">
          <BoltIcon />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Nome </span>
            <span>00</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">NIF: </span>
            <span>xxxxxxxxxxxxxxx</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Telefone: </span>
            <span>94657836</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Email: </span>
            <span>email@example.com</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">Cidade </span>
            <span>Luanda - Angola</span>
          </div>
          <div className="flex items-center justify-between w-full gap-4">
            <span className="font-bold">Morada: </span>
            <span className="line-clamp-1 w-full text-right">
              Alguma coisa gggggggggggggggg ggg
            </span>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-2 gap-6 ">
        <div className="col-span-2 flex flex-col">
          <Label htmlFor="customer-name">Nome do cliente</Label>
          <AutoComplete
            value={value}
            suggestions={items}
            completeMethod={search}
            onChange={(e) => setValue(e.value)}
            inputClassName={cn(inputClassName)}
            panelClassName="w-full"
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="customer-contribuinte">Contribuinte</Label>
          <Input id="customer-contribuinte" />
        </div>
        <div>
          <Label htmlFor="customer-telephone">Telefone</Label>
          <Input
            id="customer-telephone"
            placeholder="900 00 00 00"
            type="text"
          />
        </div>
        <div>
          <Label htmlFor="customer-email">Email</Label>
          <Input
            id="customer-email"
            placeholder="example@ex.com"
            type="email"
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="customer-address">Endereço</Label>
          <Textarea
            id="customer-address"
            placeholder="123 Main St, Anytown USA"
          />
        </div>
      </div> */}
    </div>
  );
}
