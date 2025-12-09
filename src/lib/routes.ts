export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  contact: "/contact",
  blog: {
    list: "/blog",
    detail: (id: string) => `/blog/${id}`,
    create: "/blog/create",
    edit: (id: string) => `/blog/edit/${id}`,
  },
  booking: "/booking",
  privacyPolicy: "/privacy-policy",
  cookiesPolicy: "/cookies-policy",
  legalNotice: "/legal-notice",
  login: "/admin-login",
  users: "/users"
} as const;
