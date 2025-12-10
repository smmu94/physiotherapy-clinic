import { DefaultSession, DefaultUser } from "next-auth";

// 1. Extender el tipo User
declare module "next-auth" {
  interface User extends DefaultUser {
    is_admin: boolean;
  }

  // 2. Extender el tipo Session
  interface Session extends DefaultSession {
    user?: {
      id: string; 
      is_admin: boolean; // Propiedad personalizada clave
    } & DefaultSession["user"];
  }
}

// 3. Extender el tipo JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    is_admin: boolean; // Propiedad personalizada clave
  }
}