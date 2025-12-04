import { routes } from "@/lib/routes";

export const privacyItems = [
  { href: routes.privacyPolicy, label: "footer.privacy" },
  { href: routes.cookiesPolicy, label: "footer.cookies" },
  { href: routes.legalNotice, label: "footer.legal" },
] as const;