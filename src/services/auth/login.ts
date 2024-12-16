import { api } from '@/libs/axios';

export type LoginResponseData = {
  id: string;
  name: string;
  email: string;
  role: string;
  picture?: string | null;
};

export type LoginRequestData = {
  email: string;
  password: string;
};

export async function loginService(data: LoginRequestData) {
  return api.post<LoginResponseData>('/auth/login', data);
}
