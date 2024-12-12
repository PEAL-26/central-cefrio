import { SettingsCompany } from "@/components/templates/settings";
import { Suspense } from "react";

export const metadata = {
  title: "Configurações de empresa",
};

export default function SettingsCompanyPage() {
  return (
    <Suspense>
      <SettingsCompany />
    </Suspense>
  );
}
