
import { routes } from "@/lib/routes";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: routes.login },

  callbacks: {
    async authorized({ auth, request }) {
      const nextUrl = request.nextUrl;
      const path = nextUrl.pathname;

      // Usar auth directamente en lugar de auth.user
      const isLoggedIn = !!auth?.user;
      const userIsAdmin = auth?.user?.is_admin === true;

      const isBlogRoute = path.includes(routes.blog.create) || path.includes(routes.blog.edit(''));
      const isUsersRoute = path.includes(routes.users);
      const isLoginRoute = path.includes(routes.login);

      console.log('AUTHORIZED CALLBACK:', {
        isLoggedIn,
        userIsAdmin,
        path,
        fullAuth: auth, // Ver el objeto auth completo
        user: auth?.user,
        is_admin_value: auth?.user?.is_admin,
      });

      if (isBlogRoute && !isLoggedIn) {
        return false;
      }

      if (isUsersRoute && !userIsAdmin) {
        return Response.redirect(new URL(routes.blog.list, nextUrl));
      }

      if (isLoginRoute && isLoggedIn) {
        return Response.redirect(new URL(routes.blog.list, nextUrl));
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;