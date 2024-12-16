import { api } from '@/libs/axios';

export type RecoverPasswordRequestData = {
  code: string;
  newPassword: string;
};

export async function recoverPasswordService(token: string, data: RecoverPasswordRequestData) {
  const { code, newPassword } = data;
  return api.post(`/auth/recover-password?token=${token}`, {
    code,
    newPassword,
  });
}
