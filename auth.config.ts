import { routes } from '@/lib/routes';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: routes.login,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;

      const isBlogAdminRoute =
        path.includes(routes.blog.create) ||
        path.includes(routes.blog.edit(''));

      if (isBlogAdminRoute && !isLoggedIn) {
        return Response.redirect(new URL(routes.login, nextUrl));
      }

      if (path.includes(routes.login) && isLoggedIn) {
        return Response.redirect(new URL(routes.blog.list, nextUrl));
    }
      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
