import CreatePostForm from "@/components/form/createPostForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post",
};

export default async function CreatePost() {
  return (
    <div className="bg-accent p-10 h-full flex justify-center items-start">
      <CreatePostForm />
    </div>
  );
}