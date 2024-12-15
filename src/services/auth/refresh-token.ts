import { api } from "@/libs/axios";

export type RefreshTokenResponseData = {
  token: string;
};

export async function refreshTokenService() {
  return api.post<RefreshTokenResponseData>("/auth/refresh-token");
}
