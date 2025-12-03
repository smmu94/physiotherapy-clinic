"use client";

import LanguageSwitcher from "@/components/ui/languageSwitcher";
import { routes } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import NavLinks from "./nav-links";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray bg-white">
      <div className="flex items-center justify-between px-4 py-4">
        <Link href={routes.home} className="text-preset-4-bold text-primary shrink-0">
          <Image src="/svgs/logo.svg" alt="Logo" width={200} height={50} />
        </Link>
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <NavLinks />
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden cursor-pointer"
            aria-label="Toggle Menu"
          >
            <RxHamburgerMenu className="text-preset-3" />
          </button>
        </div>
      </div>
      {open && (
        <div className="flex flex-col gap-4 border-t border-gray px-4 py-4 md:hidden">
          <NavLinks onLinkClick={() => setOpen(false)} isMobile />
          <div className="border-t border-gray pt-4">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
