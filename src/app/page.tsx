import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <>
      <li>Gráficos</li>
      <li>Faturas dos últimos 30 dias</li>
      <li>Pagamentos</li>
    </>
  );
}
