import { useTranslations } from "next-globe-gen";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { privacyItems } from "./constants";
import { navItems } from "../navbar/constants";
export default function Footer() {
  const t = useTranslations("common");
  return (
    <footer className="flex flex-col gap-6 text-preset-4 py-6 border-t border-gray">
      <div className="flex gap-16 justify-center items-center"> 
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} className="hover:text-primary transition-colors">{t(item.label)}</Link>
        ))}
      </div>
      <div className="flex gap-6 justify-center items-center"> 
        {privacyItems.map((item) => (
          <Link href={item.href} key={item.href} className="hover:text-primary transition-colors">{t(item.label)}</Link>
        ))}
      </div>
      <div className="text-center flex gap-4 justify-center items-center">
        <FaFacebook className="cursor-pointer hover:text-primary transition-colors" size={20} />
        <FaInstagram className="cursor-pointer hover:text-primary transition-colors" size={20} />
        <FaLinkedin className="cursor-pointer hover:text-primary transition-colors" size={20} />
      </div>
      <div className="text-center text-preset-5 ">
        <p>&copy; {new Date().getFullYear()} ELON Physio, {t("footer.rights")}</p>
      </div>
    </footer>
  );
}