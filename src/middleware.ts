import { type NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getServerCookie } from "./libs/cookies/server-cookies";
import { COOKIES } from "./constants/cookies";

const PUBLIC_ROUTES = ["/login", "/forgot-password", "/reset-password"];

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const session = req?.nextauth.token;

    const token = getServerCookie(COOKIES.TOKEN) || '';

    if (!PUBLIC_ROUTES.includes(req.nextUrl.pathname) && !session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const headers = new Headers(req.headers);
    headers.append("authorization", `Bearer ${token}`);
    
    if (PUBLIC_ROUTES.includes(req.nextUrl.pathname) && session) {
      return NextResponse.redirect(new URL("/", req.url), { headers });
    }

    return NextResponse.next({ headers });
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (!PUBLIC_ROUTES.includes(req.nextUrl.pathname) && !token) {
          return false;
        }

        return true;
      },
    },
  }
);
