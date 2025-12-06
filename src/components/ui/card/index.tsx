import Image from "next/image";
import { CardProps } from "./types";
import { formatDate } from "@/lib/utils";
import { getLocale } from "next-globe-gen";

export default function Card({
  image,
  title,
  content,
  date,
  isPost = false,
  children,
}: CardProps) {
  const locale = getLocale();
  const formattedDate = formatDate(date, locale);
  return (
    <div className="flex flex-col max-w-3xs w-full rounded-lg shadow-lg bg-white">
      <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="flex flex-col flex-1 p-4 gap-2">
        {isPost && (
          <time className="text-preset-5 text-primary">
            {formattedDate}
          </time>
        )}
        <h3 className="text-preset-3-bold text-dark line-clamp-2 min-h-10">
          {title}
        </h3>
        <p className="text-preset-5 text-foreground line-clamp-4 min-h-20">
          {content}
        </p>
        <div className="mt-auto">{children}</div>
      </div>
    </div>
  );
}
