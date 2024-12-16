import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { loginService } from '@/services/auth';

export const nextAuthUrl = process.env.NEXTAUTH_URL;
export const secret = process.env.NEXTAUTH_SECRET;

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (typeof credentials === 'undefined') return null;

        const input = {
          email: `${credentials.email}`,
          password: `${credentials.password}`,
        };

        const user = await loginService(input);

        if (user) {
          return { ...user } as any;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token = { ...user };
      }
      return token;
    },
  },
  secret,
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  logger: {
    error(error) {
      console.error(error);
    },
    warn(warning) {
      console.warn(warning);
    },
  },
};
