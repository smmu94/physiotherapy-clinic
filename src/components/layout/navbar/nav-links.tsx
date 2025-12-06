import { Link, useTranslations } from "next-globe-gen";
import { navItems } from "./constants";
import { NavLinksProps } from "./types";

export default function NavLinks({ onLinkClick, isMobile = false }: NavLinksProps) {
    const t = useTranslations("common");
    
    return (
    <>
      {navItems.map((link) => (
        <Link
          key={link.href}
          href={link.href}
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