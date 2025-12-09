import { routes } from "@/lib/routes";
import { getToken } from "next-auth/jwt";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: routes.login },

  callbacks: {
    async authorized({ request }) {
      const nextUrl = request.nextUrl;

      const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
      const userIsAdmin = token?.is_admin === true;
      const isLoggedIn = !!token?.email;

      const path = nextUrl.pathname;
      const isBlogRoute = path.includes(routes.blog.create) || path.includes(routes.blog.edit(''));
      const isUsersRoute = path.includes(routes.users);

      if (isBlogRoute && !isLoggedIn) {
        return Response.redirect(new URL(routes.login, nextUrl));
      }

      if (isUsersRoute && !userIsAdmin) {
        return Response.redirect(new URL(routes.blog.list, nextUrl));
      }

      if (path.includes(routes.login) && isLoggedIn) {
        return Response.redirect(new URL(routes.blog.list, nextUrl));
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
