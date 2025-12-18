"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createUser } from "@/lib/actions";
import Button from "@/components/ui/button";
import { CreateUserState } from "@/lib/types";
import { useTranslations } from "next-globe-gen";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useToast } from "@/components/tailframes/toast";

export default function CreateUserForm() {
  const { success, error } = useToast();
  const initialState: CreateUserState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(createUser, initialState);
  const lastProcessedTimestamp = useRef<number | undefined>(undefined);
  const t = useTranslations("users");
  const tErrors = useTranslations("errors");
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!state.message || !state.timestamp) return;
    if (state.timestamp === lastProcessedTimestamp.current) return;
    lastProcessedTimestamp.current = state.timestamp;
    const isSuccess = state.message === "user_created";
    const message = tErrors(state.message as keyof typeof tErrors);

    if (isSuccess) {
      success(message);
      formRef.current?.reset();
    } else {
      error(message);
    }
    // La dependencia clave aquí es state.timestamp
  }, [state.timestamp, state.message, success, error, tErrors]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-6 max-w-sm w-full rounded-lg bg-white px-6 pb-6 pt-8 shadow-sm"
    >
      <h2 className="text-preset-3-bold text-dark text-center">{t("form.title")}</h2>
      
      <div>
        <label className="text-preset-5-bold text-dark" htmlFor="name">
          {t("form.name")}
        </label>
        <input
          key={`name-${state.timestamp}`}
          className="w-full rounded-md border border-neutral-light py-2.5 px-3 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
          id="name"
          name="name"
          type="text"
          defaultValue={state.formData?.get("name")?.toString() || ""}
          placeholder="María López"
          required
        />
        {state?.errors?.name && (
          <p className="text-red-500 text-sm mt-1">{tErrors(state.errors.name[0] as keyof typeof tErrors)}</p>
        )}
      </div>

      <div>
        <label className="text-preset-5-bold text-dark" htmlFor="email">
          {t("form.email")}
        </label>
        <input
          key={`email-${state.timestamp}`}
          className="w-full rounded-md border border-neutral-light py-2.5 px-3 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
          id="email"
          name="email"
          type="email"
          defaultValue={state.formData?.get("email")?.toString() || ""}
          placeholder="usuario@example.com"
          required
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm mt-1">{tErrors(state.errors.email[0] as keyof typeof tErrors)}</p>
        )}
      </div>

      <div>
        <label className="text-preset-5-bold text-dark" htmlFor="password">
          {t("form.password")}
        </label>
        <div className="relative">
          <input
            key={`pass-${state.timestamp}`}
            className="w-full rounded-md border border-neutral-light py-2.5 px-3 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            defaultValue={state.formData?.get("password")?.toString() || ""}
            placeholder="********"
            minLength={6}
            required
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
        {state?.errors?.password && (
          <p className="text-red-500 text-sm mt-1">{tErrors(state.errors.password[0] as keyof typeof tErrors)}</p>
        )}
      </div>

      <div>
        <label className="text-preset-5-bold text-dark" htmlFor="is_admin">
          {t("form.role.role")}
        </label>
        <select
          key={`admin-${state.timestamp}`}
          name="is_admin"
          id="is_admin"
          defaultValue={state.formData?.get("is_admin")?.toString() || "false"}
          className="w-full rounded-md border border-neutral-light py-2.5 px-3 text-preset-5 outline-0 focus:border-accent focus:ring-1 focus:ring-accent"
        >
          <option value="false">{t("form.role.user")}</option>
          <option value="true">{t("form.role.admin")}</option>
        </select>
      </div>

      <Button type="submit" loading={isPending} className="w-full">
        {t("form.cta")}
      </Button>
    </form>
  );
}