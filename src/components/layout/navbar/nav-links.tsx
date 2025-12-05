import { useTranslations, useLocale } from "next-globe-gen";
import Link from "next/link";
import { navItems } from "./constants";
import { NavLinksProps } from "./types";

export default function NavLinks({ onLinkClick, isMobile = false }: NavLinksProps) {
    const t = useTranslations("common");
    const locale = useLocale();
    
    return (
    <>
      {navItems.map((link) => (
        <Link
          key={link.href}
          href={`/${locale}${link.href}`}
          onClick={onLinkClick}
          className={
            link.label === "navbar.booking"
              ? `btn-primary ${isMobile ? "text-center" : ""}`
              : "text-preset-4 hover:text-primary transition-colors"
          }
        >
          {t(link.label)}
        </Link>
      ))}
    </>
  );
}