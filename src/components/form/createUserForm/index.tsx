"use client";

import { useActionState } from "react";
import { createUser } from "@/lib/actions";
import Button from "@/components/ui/button";
import { CreateUserState } from "@/lib/types";
import { useTranslations } from "next-globe-gen";

export default function CreateUserForm() {
  const initialState: CreateUserState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(createUser, initialState);
  const t = useTranslations("users");
  const tErrors = useTranslations("errors");
  return (
    <form
      action={formAction}
      className="flex flex-col gap-6 max-w-sm w-full rounded-lg bg-white px-6 pb-6 pt-8 shadow-sm"
    >
      <h2 className="text-preset-3-bold text-dark text-center">{t("form.title")}</h2>
      <div>
        <label className="text-preset-5-bold text-dark" htmlFor="name">
          {t("form.name")}
        </label>
        <input
          className="w-full rounded-md border border-neutral-light py-2.5 px-3 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
          id="name"
          name="name"
          type="text"
          placeholder="María López"
          required
        />
        {state?.errors?.name && (
          <p className="text-red-500">{tErrors(state.errors.name as keyof typeof tErrors)}</p>
        )}
      </div>
      <div>
        <label className="text-preset-5-bold text-dark" htmlFor="email">
          {t("form.email")}
        </label>
        <input
          className="w-full rounded-md border border-neutral-light py-2.5 px-3 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
          id="email"
          name="email"
          type="email"
          placeholder="usuario@example.com"
          required
        />
        {state?.errors?.email && (
          <p className="text-red-500">{t(state.errors.email as keyof typeof tErrors)}</p>
        )}
      </div>
      <div>
        <label className="text-preset-5-bold text-dark" htmlFor="password">
          {t("form.password")}
        </label>
        <input
          className="w-full rounded-md border border-neutral-light py-2.5 px-3 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
          id="password"
          name="password"
          type="password"
          placeholder="********"
          minLength={6}
          required
        />
        {state?.errors?.password && (
          <p className="text-red-500">{t(state.errors.password as keyof typeof tErrors)}</p>
        )}
      </div>
      <div>
        <label className="text-preset-5-bold text-dark" htmlFor="is_admin">
          {t("form.role.role")}
        </label>
        <select
          name="is_admin"
          id="is_admin"
          className="w-full rounded-md border border-neutral-light py-2.5 px-3 text-preset-5 outline-0 focus:border-accent focus:ring-1 focus:ring-accent"
        >
          <option value="false">{t("form.role.user")}</option>
          <option value="true">{t("form.role.admin")}</option>
        </select>
        {state?.errors?.is_admin && (
          <p className="text-red-500">{t(state.errors.is_admin as keyof typeof tErrors)}</p>
        )}
      </div>
      <Button type="submit" aria-disabled={isPending} className="w-full">
        {t("form.cta")}
      </Button>
      {state.message && (
        <div className="text-red-500 text-preset-5 mt-2">{tErrors(state.message as keyof typeof tErrors)}</div>
      )}
    </form>
  );
}
