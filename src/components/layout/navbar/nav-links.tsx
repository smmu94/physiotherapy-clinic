import { routes } from "@/lib/routes";
import Link from "next/link";
import { NavLinksProps } from "./types";
import { navItems } from "./constants";

export default function NavLinks({ onLinkClick, isMobile = false }: NavLinksProps) {
  return (
    <>
      {navItems.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className="text-preset-4 hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
      <Link
        href={routes.booking}
        onClick={onLinkClick}
        className={`btn-primary ${isMobile ? "text-center" : ""}`}
      >
        Book Appointment
      </Link>
    </>
  );
}
