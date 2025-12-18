import CreatePostForm from "@/components/form/createPostForm";
import { Metadata } from "next";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import BreadCrumb from "@/components/ui/breadCrumb";
import { getTranslations } from "next-globe-gen";


export const metadata: Metadata = {
  title: "Create Post",
};

export default async function CreatePost() {
  const t = getTranslations("blog-create");
  const session = await auth();

  if (!session?.user?.id || !session?.user?.name) {
    redirect(routes.login);
  }

  const user = {
    id: session.user.id,
    name: session.user.name,
  };

  return (
    <div className="bg-accent p-10 min-h-screen flex flex-col gap-8">
      <BreadCrumb breadcrumb={[
        {title: t("breadcrumb.blog"), href: routes.blog.list},
        {title: t("breadcrumb.createPost"), href: routes.blog.create},
        ]}
      />
      <div className="flex justify-center">
        <CreatePostForm user={user} />
      </div>
    </div>
  );
}
