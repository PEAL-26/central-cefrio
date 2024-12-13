import { SettingsCompany } from "@/components/templates/settings";
import { Loading } from "@/components/ui/loading";
import { Suspense } from "react";

export const metadata = {
  title: "Configurações de empresa",
};

export default function SettingsCompanyPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Atualizar informações da empresa</h1>
        <p className="text-muted-foreground">
          Preencha o formulário abaixo para atualizar os dados da sua empresa.
        </p>
      </div>
      <SettingsCompany />
    </Suspense>
  );
}
