import { ReactNode } from "react";

export type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  style?: "primary" | "secondary" | "ghost" | "accent";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string; 
}