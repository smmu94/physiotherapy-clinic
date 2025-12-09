"use client";

import { routes } from "@/lib/routes";
import { Link, useLocale, useTranslations } from "next-globe-gen";
import Image from "next/image";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import Select from "@/components/form/select";
import Button from "@/components/ui/button";
import LanguageSwitcher from "@/components/ui/languageSwitcher";
import NavLinks from "./nav-links";
import { NavbarProps } from "./types";
import { getUserDropdownOptions } from "./utils";

export default function Navbar({ session }: NavbarProps) {
  const locale = useLocale();
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);

  const dropdownOptions = getUserDropdownOptions(session, t, locale);

  return (
    <nav className="w-full border-b border-gray bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-4">
        <Link href={routes.home} className="shrink-0">
          <Image src="/svgs/logo.svg" alt="Logo" width={200} height={50} />
        </Link>
        <div className="hidden lg:flex items-center gap-4 flex-1 justify-center">
          <NavLinks />
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden lg:flex items-center gap-4">
            {session?.user ? (
              <Select
                options={dropdownOptions}
                placeholder={session.user.name || "Usuario"}
                isSearchable={false}
                onChange={(option) => option?.onClick?.()}
              />
            ) : (
              <Link href={routes.login}>
                <Button style="ghost">Admin</Button>
              </Link>
            )}
            <LanguageSwitcher />
          </div>
          <button onClick={() => setOpen(!open)} className="lg:hidden cursor-pointer">
            <RxHamburgerMenu className="text-preset-3" />
          </button>
        </div>
      </div>
      {open && (
        <div className="flex flex-col gap-4 border-t border-gray px-4 py-4 lg:hidden">
          <NavLinks onLinkClick={() => setOpen(false)} isMobile />
          <div className="flex flex-wrap justify-center gap-4">
            {session?.user ? (
              <>
                {dropdownOptions.map((opt) => (
                  <Button
                    key={opt.value}
                    style="accent"
                    onClick={() => {
                      opt.onClick?.();
                      setOpen(false);
                    }}
                  >
                    {opt.icon} {opt.label}
                  </Button>
                ))}
              </>
              ) : (
              <Link href={routes.login} onClick={() => setOpen(false)}>
                <Button style="ghost" className="w-full">
                  Admin
                </Button>
              </Link>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
