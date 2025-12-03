"use client";

import { routes } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Select from "../form/select";
import type { Option } from "../form/select/types";
import NavLinks from "./nav-links";
import { languageOptions } from "./constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Option | null>(languageOptions[1]);

  const handleLanguageChange = (option: Option | null) => {
    setLang(option);
  };

  return (
    <nav className="w-full border-b border-gray bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href={routes.home} className="text-preset-4-bold text-primary">
          <Image src="/svgs/logo.svg" alt="Logo" width={200} height={50} />
        </Link>
        <div className="flex items-center gap-4">
            <div className="hidden gap-8 md:flex items-center">
                <NavLinks />
            </div>
            <div className="w-24">
                <Select
                    options={languageOptions}
                    value={lang}
                    onChange={handleLanguageChange}
                    placeholder="Language"
                />
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
        </div>
      )}
    </nav>
  );
}
