import "next-auth";

declare module "next-auth" {
  interface User {
    is_admin?: boolean;
  }
  interface Session {
    user: {
      id: string;
      is_admin?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    is_admin?: boolean;
  }
}