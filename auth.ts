import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { fetchUserByEmail } from "@/lib/data";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        const user = await fetchUserByEmail(email);
        if (!user) return null;

        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          is_admin: user.is_admin,
        };
      },
    })
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.is_admin = user.is_admin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.is_admin = token.is_admin as boolean;
      }
      return session;
    },
  },
});