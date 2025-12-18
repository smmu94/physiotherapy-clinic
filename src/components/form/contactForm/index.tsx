"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactForm } from "@/lib/actions";
import { ContactState } from "@/lib/types";
import Button from "@/components/ui/button";
import { useTranslations } from "next-globe-gen";
import { useToast } from "@/components/tailframes/toast";

export default function ContactForm() {
  const { success, error } = useToast();
  const tErrors = useTranslations("errors");
  const t = useTranslations("contact");
  const initialState: ContactState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(sendContactForm, initialState);
  
  const lastProcessedTimestamp = useRef<number | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.message || !state.timestamp) return;
    if (state.timestamp === lastProcessedTimestamp.current) return;

    lastProcessedTimestamp.current = state.timestamp;

    const isSuccess = state.message === "message_sent";
    const message = tErrors(state.message as keyof typeof tErrors);

    if (isSuccess) {
      success(message);
      formRef.current?.reset();
    } else {
      error(message);
    }
  }, [state.timestamp, state.message, success, error, tErrors]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-6 rounded-lg bg-white p-6 shadow-sm w-full max-w-xl mx-auto"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-preset-5-bold text-dark">
          {t("form.name.label")}
        </label>
        <input
          key={`name-${state.timestamp}`}
          id="name"
          name="name"
          type="text"
          defaultValue={state.formData?.get('name')?.toString() || ''}
          placeholder={t("form.name.placeholder")}
          className="w-full rounded-md border border-neutral-light py-2.5 pl-6 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <div className="min-h-5 mt-1">
          {state.errors?.name?.map((err) => (
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
          key={`email-${state.timestamp}`}
          id="email"
          name="email"
          type="email"
          defaultValue={state.formData?.get('email')?.toString() || ''}
          placeholder={t("form.email.placeholder")}
          className="w-full rounded-md border border-neutral-light py-2.5 pl-6 text-preset-5 outline-0 placeholder:text-neutral-medium focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <div className="min-h-5 mt-1">
          {state.errors?.email?.map((err) => (
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
          key={`msg-${state.timestamp}`}
          id="message"
          name="message"
          defaultValue={state.formData?.get('message')?.toString() || ''}
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

      <Button type="submit" loading={isPending}>
        {t("form.submit")}
      </Button>
    </form>
  );
}