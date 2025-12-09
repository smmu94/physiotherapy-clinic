import { fetchPostById } from "@/lib/data";
import { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { getLocale } from "next-globe-gen";
import Image from "next/image";
import { FaCalendar, FaUser } from "react-icons/fa";
import { PostDetailProps } from "./types";

export default async function PostDetail({ id }: PostDetailProps) {
    if (!id) return <p>Post no encontrado</p>;
    const post: Post = await fetchPostById(id);
    const locale = getLocale();
    const formattedDate = formatDate(post.created_at, locale);
    return (
        <article className="max-w-3xl p-8 flex flex-col items-center w-full gap-8">
            <div className="flex flex-col items-center gap-2 w-full">
                <h1 className="text-preset-1 text-dark text-center capitalize">{post.title}</h1>
                <div className="flex gap-8 items-center">
                    <span className="text-preset-5 text-primary flex gap-2 items-center">
                        <FaUser /> Por: {post.author_name}
                    </span>
                    <time className="text-preset-5 text-primary flex gap-2 items-center">
                        <FaCalendar /> {formattedDate}
                    </time>
                </div>
            </div>
            <div className="relative w-full h-180 overflow-hidden bg-dark/80">
                <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-contain rounded-lg"
                    loading="eager"
                />
            </div>
            <div className="w-full mt-8 flex flex-col gap-4">
                {post.content.split("\n").map((paragraph, index) => (
                    <p key={index} className="text-preset-4 text-foreground text-left">
                    {paragraph}
                    </p>
                ))}
            </div>
        </article>
    );
}
