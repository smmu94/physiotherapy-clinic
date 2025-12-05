import { Session } from 'next-auth';

export type NavbarProps = {
  session: Session | null;
}

export type NavLinksProps = {
  onLinkClick?: () => void;
  isMobile?: boolean;
}