import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const setServerCookie = (key: string, value: string, options?: any) => {
  const response = NextResponse.next({});
  response.cookies.set(key, value, {
    path: "/",
    ...options,
  });
  return response;
};

export const getServerCookie = (key: string): string | undefined => {
  const allCookies = cookies();
  return allCookies.get(key)?.value;
};

export const removeServerCookie = (key: string, options?: ResponseCookie) => {
  const allCookies = cookies();
  allCookies.delete(key);
};
