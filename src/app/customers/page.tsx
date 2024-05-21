import { ListCustomers } from "@/components/templates/customers";
import { Suspense } from "react";

export const metadata = {
  title: "Clientes",
};

export default function CustomersPage() {
  return (
    <Suspense>
      <ListCustomers />
    </Suspense>
  );
}
