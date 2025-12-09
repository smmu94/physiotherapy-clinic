import PostList from "@/components/ui/postList";
import { getTranslations } from "next-globe-gen";

export default async function Posts({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const t = getTranslations("blog-list");
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  return (
    <div className="flex flex-col gap-8 p-12 items-center">
      <div className="flex flex-col gap-3 items-center text-center">
        <h1 className="text-preset-1 text-dark">{t("title")}</h1>
        <p className="text-preset-3 text-primary">{t("subtitle")}</p>
      </div>
      <PostList page={page} />
    </div>
  );
}
