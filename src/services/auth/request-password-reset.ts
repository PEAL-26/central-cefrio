import { api } from "@/libs/axios";

export type RequestPasswordResetResponseData = {
  token: string;
};

export type RequestPasswordResetRequestData = {
  email: string;
};

export async function requestPasswordResetService({
  email,
}: RequestPasswordResetRequestData) {
  return api.post<RequestPasswordResetResponseData>(
    "/auth/request-password-reset",
    {
      email,
    },
  );
}
