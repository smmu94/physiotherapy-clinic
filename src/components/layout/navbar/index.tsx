"use client";

import Button from "@/components/ui/button";
import LanguageSwitcher from "@/components/ui/languageSwitcher";
import { logout } from "@/lib/actions";
import { routes } from "@/lib/routes";
import { Link, useLocale } from "next-globe-gen";
import Image from "next/image";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import NavLinks from "./nav-links";
import { NavbarProps } from "./types";

export default function Navbar({ session }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();

  const handleLogout = () => {
    logout(`/${locale}${routes.login}`);
  };

  return (
    <nav className="w-full border-b border-gray bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-4">
        <Link href={routes.home} className="text-preset-4-bold text-primary shrink-0">
          <Image src="/svgs/logo.svg" alt="Logo" width={200} height={50} />
        </Link>
        <div className="hidden lg:flex items-center gap-4 flex-1 justify-center">
          <NavLinks />
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden lg:flex items-center gap-4">
            {session?.user &&
              <Button style="accent" onClick={handleLogout}>Log Out</Button>
            }
            <LanguageSwitcher />
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden cursor-pointer"
            aria-label="Toggle Menu"
          >
            <RxHamburgerMenu className="text-preset-3" />
          </button>
        </div>
      </div>
      {open && (
        <div className="flex flex-col gap-4 border-t border-gray px-4 py-4 lg:hidden">
          <NavLinks onLinkClick={() => setOpen(false)} isMobile />
          <div className="border-t border-gray pt-4 flex justify-between">
            <LanguageSwitcher />
            {session?.user &&
              <Button style="accent" onClick={handleLogout}>Log Out</Button>
            }
          </div>
        </div>
      )}
    </nav>
  );
}
