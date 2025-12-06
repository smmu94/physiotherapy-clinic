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
} as const;

export const getLocaleFromHeaders = async () => {
  try {
    const { headers } = await import("next/headers");
    const headersList = await headers();
    
    const referer = headersList.get("referer") || "";
    
    const match = referer.match(/\/([a-z]{2})(?:\/|$)/);
    
    if (match) {
      const locale = match[1];
      return locale;
    }
    
    return "en";
  } catch (error) {
    console.error("Error getting locale:", error);
    return "en";
  }
};
