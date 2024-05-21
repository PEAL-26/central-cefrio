import { Suspense } from "react";
import { ListCustomers } from "@/components/templates/customers/list/index";

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
