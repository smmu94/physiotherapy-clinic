"use client";

import Button from "@/components/ui/button";
import { createPost } from "@/lib/actions";
import Image from "next/image";
import { useActionState, useState } from "react";
import { DEFAULT_POST_IMAGE } from "./constants";
import { useTranslations } from "next-globe-gen";
import { PostState } from "@/lib/types";

export default function CreatePostForm({ user }: {user: {
  id: string;
  name: string;
}}) {
  const initialState: PostState = { message: null, errors: {} };
  const wrappedCreatePost = (prevState: PostState, formData: FormData) =>
    createPost(prevState, formData, user.id, user.name);
  const [state, formAction] = useActionState(wrappedCreatePost, initialState);
  const [preview, setPreview] = useState<string>(DEFAULT_POST_IMAGE);

  const t = useTranslations("blog-create");
  const tErrors = useTranslations("errors");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(DEFAULT_POST_IMAGE);
    }
  };

  return (
    <form
      action={formAction}
      className="flex flex-col gap-6 rounded-lg bg-white p-6 shadow-sm w-full max-w-5xl"
    >
      <input type="hidden" name="default_image" value={DEFAULT_POST_IMAGE} />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-preset-5-bold text-dark">
              {t("title.label")}
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder={t("title.placeholder")}
              className="w-full rounded-md border border-neutral-light py-2.5 pl-6 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
              aria-describedby="title-error"
            />
            <div className="min-h-5 mt-1">
              {state.errors?.title?.map((error) => (
                <p key={error} className="text-red-500 text-preset-5">
                  {tErrors(error as keyof typeof tErrors)}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-preset-5-bold text-dark">
              {t("content.label")}
            </label>
            <textarea
              id="content"
              name="content"
              placeholder={t("content.placeholder")}
              rows={15}
              className="w-full rounded-md border border-neutral-light py-2.5 pl-6 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
              aria-describedby="content-error"
            />
            <div className="min-h-5 mt-1">
              {state.errors?.content?.map((error) => (
                <p key={error} className="text-red-500 text-preset-5">
                  {tErrors(error as keyof typeof tErrors)}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <label className="text-preset-5-bold text-dark">{t("image.label")}</label>
          <label
            htmlFor="image"
            className="text-center cursor-pointer rounded-md bg-primary px-4 py-3 text-preset-5 w-2xs text-white hover:bg-dark"
          >
            {t("image.labelButton")}
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            aria-describedby="image-error"
          />
          <div className="min-h-5 mt-1">
            {state.errors?.image_url?.map((error) => (
              <p key={error} className="text-red-500 text-preset-5">
                {tErrors(error as keyof typeof tErrors)}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-preset-5-bold text-dark mb-2">{t("image.preview")}</p>
            <div className="relative w-full h-80 rounded-md overflow-hidden bg-neutral-light">
              <Image 
                src={preview} 
                alt="Preview" 
                fill 
                className="object-contain p-4" />
            </div>
          </div>
        </div>
      </div>
      {state.message && (
        <div className="text-red-500 text-preset-5 mt-2">{tErrors(state.message as keyof typeof tErrors)}</div>
      )}
      <Button className="w-full mt-4" type="submit">
        {t("cta")}
      </Button>
    </form>
  );
}
