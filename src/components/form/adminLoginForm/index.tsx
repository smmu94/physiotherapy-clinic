"use client";

import Button from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { AuthState } from "@/lib/types";
import { useLocale, useTranslations } from "next-globe-gen";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { authenticate } from "@/lib/actions";

export default function AdminLoginForm() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || routes.blog.list;
  const formRef = useRef<HTMLFormElement>(null);
  const lastProcessedTimestamp = useRef<number | undefined>(undefined);
  
  const initialState: AuthState = { message: null };
  const [state, formAction, isPending] = useActionState(
    authenticate,
    initialState
  );
  
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("login");
  const tError = useTranslations("errors");

  useEffect(() => {
    if (!state.message || !state.timestamp) return;
    if (state.timestamp === lastProcessedTimestamp.current) return;

    lastProcessedTimestamp.current = state.timestamp;
  
  }, [state.message, state.timestamp]);

  return (
    <form 
      ref={formRef}
      action={formAction} 
      className="flex flex-col gap-6 max-w-2xs w-full rounded-lg bg-white px-6 pb-6 pt-8 shadow-sm"
    >
      <Image src="/svgs/logo.svg" alt="Logo" width={200} height={100} className="self-end" />
      <h2 className="text-preset-3-bold text-dark text-center">{t("title")}</h2>
      
      <div>
        <label className="text-preset-5-bold text-dark" htmlFor="email">
          Email
        </label>
        <div className="relative">
          <input
            key={`email-${state.timestamp}`}
            className="w-full rounded-md border border-neutral-light py-2.5 pl-6 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
            id="email"
            name="email"
            type="email"
            defaultValue={state.formData?.get("email")?.toString() || ""}
            placeholder="admin@example.com"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-preset-5-bold text-dark" htmlFor="password">
          {t("password")}
        </label>
        <div className="relative">
          <input
            key={`pass-${state.timestamp}`}
            className="w-full rounded-md border border-neutral-light py-2.5 pl-6 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            defaultValue={state.formData?.get("password")?.toString() || ""}
            placeholder="********"
            required
            minLength={6}
          />
          <Button 
            type="button"
            style="ghost"
            onClick={() => setShowPassword((prev) => !prev)}
            className="p-2 absolute right-3 top-1/2 -translate-y-1/2 border-0 focus:outline-none focus:ring-0 active:outline-none hover:bg-transparent hover:text-primary"
          >
            { showPassword ? <FaEyeSlash /> : <FaEye /> }
          </Button>
        </div>
      </div>

      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <Button className="w-full" loading={isPending} type="submit">
        {t("cta")}
      </Button>

      {state.message && (
        <p className="text-red-500 text-center text-preset-5 animate-in fade-in duration-300">
          {tError(state.message as keyof typeof tError)}
        </p>
      )}
    </form>
  );
}