import { routes } from "@/lib/routes";
import Image from "next/image";
import { Option } from "../../form/select/types";
import { Session } from "next-auth";
import { logout } from "@/lib/actions";
import { useTranslations } from "next-globe-gen";
import { FaPencilAlt, FaUserFriends } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

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
  { href: routes.services.list, label: "navbar.services" },
  { href: routes.about, label: "navbar.about" },
  { href: routes.contact, label: "navbar.contact" },
  { href: routes.blog.list, label: "navbar.blog" },
  { href: routes.booking, label: "navbar.booking" },
] as const;

type TFunc = ReturnType<typeof useTranslations>;

export const getUserDropdownOptions = (session: Session | null, t: TFunc, locale: string): Option[] => {

  if (!session?.user) return [];

  const handleLogout = () => logout(`/${locale}${routes.login}`);

  const options: Option[] = [
    {
      value: "create-post",
      label: t("navbar.createPost"),
      icon: <FaPencilAlt />,
      onClick: () => window.location.assign(`/${locale}${routes.blog.create}`),
    },
    ...(session.user.is_admin
      ? [
          {
            value: "manage-users",
            label: t("navbar.adminUsers"),
            icon: <FaUserFriends />,
            onClick: () => window.location.assign(`/${locale}${routes.users}`),
          },
        ]
      : []),
    {
      value: "logout",
      label: t("navbar.logout"),
      icon: <FiLogOut />,
      onClick: () => handleLogout(),
    },
  ];

  return options;
};