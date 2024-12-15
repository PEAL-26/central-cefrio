import "next-auth";

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: USER_ROLE;
  picture?: string;
};

export enum USER_ROLE {
  ADMIN = "ADMIN",
}

declare module "next-auth" {
  interface Session {
    user: UserType;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: USER_ROLE;
  }
}
