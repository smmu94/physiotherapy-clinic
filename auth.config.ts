import { routes } from "@/lib/routes";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: routes.login },

  callbacks: {
    async authorized({ auth, request }) {
      const nextUrl = request.nextUrl;
      const path = nextUrl.pathname;

      const isLoggedIn = !!auth?.user;

      const protectedRoutes = [
        routes.blog.create,
        routes.users,
      ];

      const isLoginRoute = path.includes(routes.login);

      if (protectedRoutes.some(p => path.includes(p)) && !isLoggedIn) {
        return false; 
      }

      if (isLoginRoute && isLoggedIn) {
        return Response.redirect(new URL(routes.blog.list, nextUrl));
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;