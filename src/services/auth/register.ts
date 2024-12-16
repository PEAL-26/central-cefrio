import { api } from '@/libs/axios';

export type RegisterRequestData = {
  name?: string;
  email: string;
  password: string;
  phone: string;
};

export type RegisterResponse = {
  token: string;
};

export async function registerService(data: RegisterRequestData) {
  return api.post<RegisterResponse>(`/auth/register`, data);
}
