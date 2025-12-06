import { fetchPosts } from "@/lib/data";
import { getTranslations, Link } from "next-globe-gen";
import Button from "../button";
import Card from "../card";
import { routes } from "@/lib/routes";

export default async function PostList() {
    const posts = await fetchPosts();
    const t = getTranslations("blog-list");
    return (
        <section className="flex flex-wrap gap-6 max-w-4xl justify-center">
                {posts.map((post) => (
                    <Card 
                        key={post.id} 
                        title={post.title} 
                        content={post.content} 
                        image={post.image_url} 
                        date={post.created_at} 
                        isPost
                    >
                        <Link href={routes.blog.detail(post.id)}>
                            <Button style="accent">{t("cta.readMore")}</Button>
                        </Link>
                    </Card>
                ))}
            </section>
    )
}