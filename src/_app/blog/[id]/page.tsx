import BreadCrumb from "@/components/ui/breadCrumb";
import PostDetail from "@/components/ui/postDetail";
import { routes } from "@/lib/routes";
import { getTranslations } from "next-globe-gen";
import { Suspense } from "react";


export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}){
  const t = getTranslations("blog-list");
  const resolvedParams =  await params;
  const id = resolvedParams.id;

  if (!id) {
    return <p className="text-red-500 mt-20">Post no encontrado</p>;
  }

  return (
    <div className="flex flex-col">
        <div className="px-16 py-8">
            <BreadCrumb breadcrumb={[
                {title: t("breadcrumb.blog"), href: routes.blog.list},
                {title: t("breadcrumb.detail"), href: routes.blog.detail(id)},
                ]}
            />
        </div>
        <div className="self-center">
          <Suspense fallback={<p>Cargando post...</p>}>
            <PostDetail id={id} />
          </Suspense>
        </div>
    </div>
    
  );
}
