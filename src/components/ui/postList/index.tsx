
import { fetchPostsPages, fetchPosts } from "@/lib/data";
import { getTranslations, Link } from "next-globe-gen";
import Button from "../button";
import Card from "../card";
import { routes } from "@/lib/routes";
import Pagination from "../pagination";

export default async function PostList({ page }: { page: number }) {
  const posts = await fetchPosts(page);
  const totalPages = await fetchPostsPages();
  const t = getTranslations("blog-list");

  return (
    <section className="flex flex-col gap-8 max-w-4xl w-full">
      <div className="flex flex-wrap gap-6 justify-center">
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            content={post.content}
            image={post.image_url}
            date={post.created_at}
            isPost
            href={routes.blog.detail(post.id)}
          >
            <Link href={routes.blog.detail(post.id)}>
              <Button style="accent" className="px-3 py-2 text-preset-5">{t("cta.readMore")}</Button>
            </Link>
          </Card>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </section>
  );
}
