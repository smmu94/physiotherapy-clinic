"use client";

import Select from "@/components/form/select";
import type { Option } from "@/components/form/select/types";
import { languageOptions } from "@/components/layout/navbar/utils";
import { useLocale } from "next-globe-gen";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const currentOption = languageOptions.find(
    (opt) => opt.value === activeLocale
  );

  const handleLanguageChange = (option: Option | null) => {
    if (!option) return;
    const pathnameWithoutLocale = pathname.replace(`/${activeLocale}`, '');
    const newPath = `/${option.value}${pathnameWithoutLocale || ''}`;
    router.push(newPath);
  };

  return (
    <div className="w-26">
      <Select
        options={languageOptions}
        value={currentOption || null}
        onChange={handleLanguageChange}
        placeholder="Language"
        isSearchable={false}
      />
    </div>
  );
}