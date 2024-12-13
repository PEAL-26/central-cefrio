import { redirect } from "next/navigation";

export const metadata = {
  title: "Configurações",
};

export default function SettingsPage() {
  return redirect("/settings/company");
}
