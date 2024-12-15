import { type NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/forgot-password", "/reset-password"];

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const session = req?.nextauth.token;

    if (!PUBLIC_ROUTES.includes(req.nextUrl.pathname) && !session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (PUBLIC_ROUTES.includes(req.nextUrl.pathname) && session) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
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
