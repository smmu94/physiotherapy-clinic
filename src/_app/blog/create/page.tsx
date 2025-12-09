import CreatePostForm from "@/components/form/createPostForm";
import { Metadata } from "next";
import { auth } from "../../../../auth";

export const metadata: Metadata = {
  title: "Create Post",
};

export default async function CreatePost({}) {
  const session = await auth();
  return (
    <div className="bg-accent p-10 h-full flex justify-center items-start">
      <CreatePostForm user={session?.user}  />
    </div>
  );
}