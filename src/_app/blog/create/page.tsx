import CreatePostForm from "@/components/form/createPostForm";
import { Metadata } from "next";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Create Post",
};

export default async function CreatePost() {
  const session = await auth();
  
  if (!session?.user?.id || !session?.user?.name) {
    redirect(routes.login);
  }

  const user = {
    id: session.user.id,
    name: session.user.name,
  };

  return (
    <div className="bg-accent p-10 h-full flex justify-center items-start">
      <CreatePostForm user={user} />
    </div>
  );
}