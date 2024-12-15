import { jwtDecode } from "jwt-decode";

type Token = {
  exp: number;
  iat: number;
};

export function validateToken<T>(token: string): T | null {
  if (!token) return null;

  const decoded = jwtDecode<T & Token>(token);
  const isValidToken = decoded.exp > Math.floor(Date.now() / 1000);
  if (!isValidToken) return null;

  return decoded;
}
