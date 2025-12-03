import { routes } from "@/lib/routes";
import Image from "next/image";
import { Option } from "../../form/select/types";

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
  { href: routes.home, label: "navbar.home" },
  { href: routes.services, label: "navbar.services" },
  { href: routes.about, label: "navbar.about" },
  { href: routes.contact, label: "navbar.contact" },
  { href: routes.booking, label: "navbar.booking" },
] as const;