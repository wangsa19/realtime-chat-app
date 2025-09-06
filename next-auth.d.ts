import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name?: string | null;
    email: string;
  }

  interface Session {
    user: User;
  }
}
