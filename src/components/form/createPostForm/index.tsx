"use client";

import Button from "@/components/ui/button";
import { createPost } from "@/lib/actions";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { DEFAULT_POST_IMAGE } from "./constants";
import { useRouter, useTranslations } from "next-globe-gen";
import { PostState } from "@/lib/types";
import { useToast } from "@/components/tailframes/toast";
import { routes } from "@/lib/routes";

export default function CreatePostForm({ user }: {user: { id: string; name: string; }}) {
  const { success, error } = useToast();
  const initialState: PostState = { message: null, errors: {} };
  const wrappedCreatePost = (prevState: PostState, formData: FormData) =>
    createPost(prevState, formData, user.id, user.name);
  
  const [state, formAction, isPending] = useActionState(wrappedCreatePost, initialState);
  const [preview, setPreview] = useState<string>(DEFAULT_POST_IMAGE);
  
  const lastProcessedTimestamp = useRef<number | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslations("blog-create");
  const tErrors = useTranslations("errors");
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        error(tErrors("image_invalid_size_message"));
        e.target.value = ""
        setPreview(DEFAULT_POST_IMAGE);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(DEFAULT_POST_IMAGE);
    }
  };

  useEffect(() => {
    if (!state.message || !state.timestamp) return;
    if (state.timestamp === lastProcessedTimestamp.current) return;

    lastProcessedTimestamp.current = state.timestamp;

    const isSuccess = state.message === "post_created_success";
    const message = tErrors(state.message as keyof typeof tErrors);

    if (isSuccess) {
      success(message);
      formRef.current?.reset();
      router.push(routes.blog.list);
    } else {
      error(message);
    }
  }, [state.timestamp, state.message, success, error, tErrors, router]);

  return (
    <form
      ref={formRef}
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
              key={`title-${state.timestamp}`}
              id="title"
              name="title"
              type="text"
              placeholder={t("title.placeholder")}
              defaultValue={state.formData?.get("title")?.toString() || ""}
              className="w-full rounded-md border border-neutral-light py-2.5 pl-6 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
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
              key={`content-${state.timestamp}`}
              id="content"
              name="content"
              defaultValue={state.formData?.get("content")?.toString() || ""}
              placeholder={t("content.placeholder")}
              rows={15}
              className="w-full rounded-md border border-neutral-light py-2.5 pl-6 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
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
      <Button className="w-full mt-4" type="submit" loading={isPending}>
        {t("cta")}
      </Button>
    </form>
  );
}