"use client";

import { useActionState } from "react";
import { sendContactForm } from "@/lib/actions";
import { ContactState } from "@/lib/types";
import Button from "@/components/ui/button";
import { useTranslations } from "next-globe-gen";

export default function ContactForm() {
  const tErrors = useTranslations("errors");
  const t = useTranslations("contact");
  const initialState: ContactState = { message: null, errors: {} };
  const [state, formAction] = useActionState(sendContactForm, initialState);
  return (
    <form
      action={formAction}
      className="flex flex-col rounded-lg bg-white p-6 shadow-sm w-full max-w-xl mx-auto"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-preset-5-bold text-dark">
          {t("form.name.label")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder={t("form.name.placeholder")}
          className="w-full rounded-md border border-neutral-light py-2.5 pl-6 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <div className="min-h-5 mt-1">
          {state.errors?.message?.map((err) => (
            <p key={err} className="text-red-500 text-preset-5">
              {tErrors(err as keyof typeof tErrors)}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-preset-5-bold text-dark">
          {t("form.email.label")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder={t("form.email.placeholder")}
          className="w-full rounded-md border border-neutral-light py-2.5 pl-6 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <div className="min-h-5 mt-1">
          {state.errors?.message?.map((err) => (
            <p key={err} className="text-red-500 text-preset-5">
              {tErrors(err as keyof typeof tErrors)}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-preset-5-bold text-dark">
          {t("form.message.label")}
        </label>
        <textarea
          id="message"
          name="message"
          placeholder={t("form.message.placeholder")}
          rows={8}
          className="w-full rounded-md border border-neutral-light py-2.5 pl-6 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <div className="min-h-5 mt-1">
          {state.errors?.message?.map((err) => (
            <p key={err} className="text-red-500 text-preset-5">
              {tErrors(err as keyof typeof tErrors)}
            </p>
          ))}
        </div>
      </div>
      {state.message && (
        <div className="text-red-500 text-preset-5 mt-2">
          {tErrors(state.message as keyof typeof tErrors)}
        </div>
      )}
      <Button type="submit">
        {t("form.submit")}
      </Button>
    </form>
  );
}
