import { BankList } from "@/components/templates/settings";
import { Loading } from "@/components/ui/loading";
import { Suspense } from "react";

export const metadata = {
  title: "Configurações de Bancos",
};

export default function SettingsBanksPage() {
  return (
    <Suspense fallback={<Loading />}>
      <h1 className="text-2xl font-bold mb-4">Configurações de Bancos</h1>
      <BankList />
    </Suspense>
  );
}
