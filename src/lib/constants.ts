import { MdOutlineSportsGymnastics } from "react-icons/md";
import { TbPhysotherapist } from "react-icons/tb";
import { PiBandaidsFill } from "react-icons/pi";
import SERVICES_JSON_ES from "@/messages/es/services.json";
import SERVICES_JSON_EN from "@/messages/en/services.json";

export const HOME_KEY_SERVICES = [
    {
        icon: MdOutlineSportsGymnastics,
        title: "aboutAndServices.services.first.title",
        description: "aboutAndServices.services.first.description"
    },
    {
        icon: TbPhysotherapist,
        title: "aboutAndServices.services.second.title",
        description: "aboutAndServices.services.second.description"
    },
    {
        icon: PiBandaidsFill,
        title: "aboutAndServices.services.third.title",
        description: "aboutAndServices.services.third.description"
    }
] as const;

export const HOME_KEY_TEAM_MEMBERS = [
    {
        image: "/images/team/team-1.jpg",
        name: "team.members.first.name",
        role: "team.members.first.role",
        description: "team.members.first.description"
    },
    {
        image: "/images/team/team-2.jpeg",
        name: "team.members.second.name",
        role: "team.members.second.role",
        description: "team.members.second.description"
    },
    {
        image: "/images/team/team-3.jpg",
        name: "team.members.third.name",
        role: "team.members.third.role",
        description: "team.members.third.description"
    }
] as const;

export const POSTS_PER_PAGE = 6;

const SERVICES_IMAGES = [
  "/images/services/osteopathy.jpg",
  "/images/services/sports_physioterapy.webp",
  "/images/services/manual_therapy.jpg",
  "/images/services/dry_needling.jpg",
  "/images/services/postural_rehabilitation.jpg",
  "/images/services/therapeutic_massage.webp"
];

export function getServices(locale: "es" | "en" = "es") {
  const SERVICES_JSON = locale === "en" ? SERVICES_JSON_EN : SERVICES_JSON_ES;

  return SERVICES_JSON.services.map((service, index) => ({
    id: `${index + 1}`,
    image: SERVICES_IMAGES[index],
    title: service.title,
    shortDescription: service.shortDescription,
    description: service.description,
    benefits: service.benefits,
    techniques: service.techniques,
  }));
}

export const EXTENDED_TEAM_MEMBERS = [
  ...HOME_KEY_TEAM_MEMBERS,
  {
    image: "/images/team/team-4.jpg",
    name: "team.members.fourth.name",
    role: "team.members.fourth.role",
    description: "team.members.fourth.description"
  },
  {
    image: "/images/team/team-5.jpg",
    name: "team.members.fifth.name",
    role: "team.members.fifth.role",
    description: "team.members.fifth.description"
  },
  {
    image: "/images/team/team-6.jpg",
    name: "team.members.sixth.name",
    role: "team.members.sixth.role",
    description: "team.members.sixth.description"
  }
] as const;

export const SERVICES_BOOKING = [
    { name: "services.osteopathy", link: "osteopathy" },
    { name: "services.sports_physiotherapy", link: "sports-physiotherapy" },
    { name: "services.manual_therapy", link: "manual-therapy" },
    { name: "services.dry_needling", link: "dry-needling" },
    { name: "services.postural_rehabilitation", link: "postural-rehabilitation" },
    { name: "services.therapeutic_massage", link: "therapeutic-massage" },
    { name: "services.initial_evaluation", link: "initial-evaluation" },
  ];