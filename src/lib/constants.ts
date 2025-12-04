import { MdOutlineSportsGymnastics } from "react-icons/md";
import { TbPhysotherapist } from "react-icons/tb";
import { PiBandaidsFill } from "react-icons/pi";

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