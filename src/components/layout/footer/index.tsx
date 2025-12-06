import { routes } from "@/lib/routes";
import { Link, useTranslations } from "next-globe-gen";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { navItems } from "../navbar/constants";
import { privacyItems } from "./constants";

export default function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="flex flex-col gap-6 text-preset-4 py-6 border-t border-gray px-6 md:px-10">
      <div className="flex flex-wrap justify-center gap-6 md:gap-16">
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="hover:text-primary transition-colors"
          >
            {t(item.label)}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {privacyItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="hover:text-primary transition-colors"
          >
            {t(item.label)}
          </Link>
        ))}
        <Link
          href={routes.login}
          className="text-neutral-medium hover:text-primary transition-colors"
        >
          Admin
        </Link>
      </div>
      <div className="flex justify-center gap-4">
        <FaFacebook className="cursor-pointer hover:text-primary transition-colors" size={20} />
        <FaInstagram className="cursor-pointer hover:text-primary transition-colors" size={20} />
        <FaLinkedin className="cursor-pointer hover:text-primary transition-colors" size={20} />
      </div>
      <div className="text-center text-preset-5">
        <p>&copy; {new Date().getFullYear()} ELON Physio, {t("footer.rights")}</p>
      </div>
    </footer>
  );
}