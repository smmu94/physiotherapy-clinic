import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ButtonProps } from "./types";
import clsx from "clsx";

export default function Button({
  children,
  onClick,
  type = "button",
  style = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  className
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const buttonClasses = clsx(
    `btn-${style}`,
    {
      "btn-disabled": isDisabled,
      "w-full": fullWidth
    },
    "flex items-center justify-center gap-2",
    "outline-none focus:outline-none",
    className
  );

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
      ) : (
        children
      )}
    </button>
  );
}
