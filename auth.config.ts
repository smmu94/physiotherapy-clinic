import { routes } from "@/lib/routes";
import { getToken } from "next-auth/jwt";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: routes.login },

  callbacks: {
    async authorized({ request, auth }) {
      const nextUrl = request.nextUrl;
      const path = nextUrl.pathname;

      const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
      const userIsAdmin = token?.is_admin === true;
      const isLoggedIn = !!token?.email;

      const isBlogRoute = path.includes(routes.blog.create) || path.includes(routes.blog.edit(''));
      const isUsersRoute = path.includes(routes.users);
      const isLoginRoute = path.includes(routes.login);

      console.log({isBlogRoute, isLoggedIn, userIsAdmin, path});

      // Si está logueado y trata de ir al login, redirigir al blog
      if (isLoginRoute && isLoggedIn) {
        return Response.redirect(new URL(routes.blog.list, nextUrl));
      }

      // Si intenta acceder a rutas de usuarios sin ser admin, redirigir al blog
      if (isUsersRoute && !userIsAdmin) {
        return Response.redirect(new URL(routes.blog.list, nextUrl));
      }

      // Si intenta acceder a rutas de blog sin estar logueado, bloquear (NextAuth redirige a login automáticamente)
      if (isBlogRoute && !isLoggedIn) {
        return false;
      }

      // Permitir acceso
      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;