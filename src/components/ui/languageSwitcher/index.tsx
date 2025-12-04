"use client";

import Select from "@/components/form/select";
import type { Option } from "@/components/form/select/types";
import { languageOptions } from "@/components/layout/navbar/constants";
import {
    useLocale,
} from "next-globe-gen";

export default function LanguageSwitcher() {
  const activeLocale = useLocale();

  const currentOption = languageOptions.find(
    (opt) => opt.value === activeLocale
  );

  const handleLanguageChange = (option: Option | null) => {
    if (!option) return;
    
    const linkElement = document.createElement("a");
    linkElement.href = `/${option.value}`;
    linkElement.click();
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