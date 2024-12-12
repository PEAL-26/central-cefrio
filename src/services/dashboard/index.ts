import { api, ApiRequestConfig } from "@/libs/axios";

type MonthlyInvoices = {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
};

interface DashboardResponse {
  customers: number;
  invoices: number;
  products: number;
  monthlyInvoices: MonthlyInvoices[];
}

export async function getDashboardData(config?: ApiRequestConfig) {
  return api.get<DashboardResponse>(`/dashboard`, config);
}
