import { routes } from "@/lib/routes";
import { Option } from "../form/select/types";
import Image from "next/image";

export const languageOptions: Option[] = [
  {
    value: "en",
    label: "EN",
    icon: <Image src="/svgs/usa-flag.svg" alt="English" width={20} height={15} />,
  },
  {
    value: "es",
    label: "ES",
    icon: <Image src="/svgs/spain-flag.svg" alt="Spanish" width={20} height={15} />,
  },
];

export const navItems = [
  { href: routes.home, label: "Home" },
  { href: routes.services, label: "Services" },
  { href: routes.about, label: "About Us" },
  { href: routes.contact, label: "Contact" },
];