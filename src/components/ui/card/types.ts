import { ReactNode } from "react";

export type CardProps = {
    date?: string;
    title: string;
    content: string;
    image: string;
    children: ReactNode;
    isPost?: boolean;
    href?: string;
}