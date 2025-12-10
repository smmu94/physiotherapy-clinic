"use client";

import Button from "@/components/ui/button";
import { useLocale, useTranslations } from "next-globe-gen";
import Image from "next/image";
import { useActionState } from "react";
import { authenticate } from "../../../lib/actions";
import { useSearchParams } from "next/navigation";
import { routes } from "@/lib/routes";
 
export default function AdminLoginForm() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || routes.blog.list;
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
   const t = useTranslations("login");
  return (
    <form 
      key={errorMessage || "login-form"} 
      action={formAction} 
      className="flex flex-col gap-6 max-w-2xs w-full rounded-lg bg-white px-6 pb-6 pt-8 shadow-sm"
    >
        <Image src="/svgs/logo.svg" alt="Logo" width={200} height={100} className="self-end" />
        <h2 className="text-preset-3-bold text-dark text-center">{t("title")}</h2>
        <div>
          <label
            className="text-preset-5-bold text-dark"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="w-full rounded-md border border-neutral-light py-2.5 pl-6 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            className="text-preset-5-bold text-dark"
            htmlFor="password"
          >
            {t("password")}
          </label>
          <div className="relative">
            <input
              className="w-full rounded-md border border-neutral-light py-2.5 pl-6 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
              id="password"
              name="password"
              type="password"
              placeholder="********"
              required
              minLength={6}
            />
          </div>
        </div>
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="w-full" aria-disabled={isPending} type="submit">
          {t("cta")}
        </Button>
        {errorMessage && (
          <p className="text-red-500">{t(errorMessage as keyof typeof t)}</p>
        )}
    </form>
  );
}
