"use client";
import Button from "@/components/ui/button";
import { HOME_KEY_SERVICES, HOME_KEY_TEAM_MEMBERS } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { Link, useLocale, useTranslations } from "next-globe-gen";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const t = useTranslations("home");
  const locale = useLocale();
  const router = useRouter();

  return (
    <>
      <section className="relative h-[90vh] bg-[url('/images/home/home-1.jpg')] bg-cover bg-center text-white flex items-center">
        <div className="absolute inset-0 bg-dark/40" />
        <div className="relative z-10 max-w-3xl px-10 flex flex-col gap-6">
          <h1 className="text-preset-1">
            {t("hero.title")}
          </h1>
          <p className="text-preset-3 text-white">
            {t("hero.description")}
          </p>
          <Button style="primary" className="w-fit" onClick={() => router.push(`/${locale}${routes.booking}`)}>{t("hero.cta")}</Button>
        </div>
      </section>
      <section className="px-10 py-24 text-dark transition-all duration-700 ease-in-out flex justify-center">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <h2 className="text-center text-preset-2 font-semibold">{t("aboutAndServices.title")}</h2>
          <p className="text-center text-preset-4 text-neutral-dark">{t("aboutAndServices.description")}</p>
          <p className="text-center text-preset-4 text-neutral-dark">{t("aboutAndServices.serviceDescription")}</p>
          <div className="flex flex-wrap gap-8 justify-center">
            {HOME_KEY_SERVICES.map(({ icon: Icon, title, description }, index) => (
              <div
                key={index}
                className="
                  flex flex-col items-center gap-4 max-w-xs text-center
                  bg-white text-dark rounded-xl px-6 py-8
                  shadow-lg shadow-gray-300/30
                  transition-transform transform hover:-translate-y-2 hover:scale-105
                "
              >
                <Icon className="h-12 w-12 text-dark rounded-full bg-accent p-2" />
                <h3 className="text-preset-4-bold">{t(title)}</h3>
                <p className="text-preset-5 text-neutral-dark">{t(description)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link 
              href={routes.services}
              className="text-primary text-preset-4 font-semibold underline underline-offset-4 hover:text-accent transition-colors"
            >
              {t("aboutAndServices.cta")}
            </Link>
          </div>
        </div>
      </section>
      <section className="px-10 py-24 bg-dark text-white transition-all duration-700 ease-in-out flex justify-center">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <h2 className="text-center text-preset-2 font-semibold">{t("team.title")}</h2>
          <p className="text-center text-preset-4 text-neutral-light">{t("team.description")}</p>
          <div className="flex flex-wrap gap-8 justify-center">
            {HOME_KEY_TEAM_MEMBERS.map(({ image, name, role, description }, index) => (
              <div
                key={index}
                className="
                  flex flex-col items-center gap-4 max-w-xs text-center
                  bg-white text-dark rounded-xl px-6 py-8
                  shadow-lg shadow-dark/20
                  transition-transform transform hover:-translate-y-2 hover:scale-105
                "
              >
                <Image
                  src={image}
                  alt={t(name)}
                  className="h-40 w-40 rounded-full border-4 border-accent object-cover"
                  width={160}
                  height={160}
                />
                <h3 className="text-preset-4-bold">{t(name)}</h3>
                <p className="text-preset-5-bold text-primary">{t(role)}</p>
                <p className="text-preset-5 text-neutral-dark">{t(description)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link
              href={routes.about}
              className="text-neutral-light text-preset-4 font-semibold underline underline-offset-4 hover:text-accent transition-colors"
            >
              {t("team.cta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
