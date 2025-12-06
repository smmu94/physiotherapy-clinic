import Button from "@/components/ui/button";
import PostList from "@/components/ui/postList";
import { routes } from "@/lib/routes";
import { Link, useTranslations } from "next-globe-gen";

export default function Posts() {
    const t = useTranslations("blog-list");
    return (
        <div className="flex flex-col gap-8 p-12 items-center">
            <div className="flex flex-col gap-3 items-center text-center">
                <h1 className="text-preset-1 text-dark">{t("title")}</h1>
                <p className="text-preset-3 text-primary">{t("subtitle")}</p>
                <Link href={routes.blog.create}>
                    <Button className="w-fit">{t("cta.create")}</Button>
                </Link>
            </div>
            <PostList />
        </div>
    );
}