import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { getServices } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { getLocale, getTranslations, Link } from "next-globe-gen";

export default function Services() {
  const t = getTranslations("services");
  const tCommon = getTranslations("common");
  const locale = getLocale()
  const services = getServices(locale)

  return (
    <div className="flex flex-col gap-8 p-12 items-center">
      <div className="flex flex-col gap-3 items-center text-center">
        <h1 className="text-preset-1 text-dark">{t("title")}</h1>
        <p className="text-preset-3 text-primary">{t("subtitle")}</p>
      </div>
      <div className="flex flex-wrap gap-6 justify-center max-w-4xl w-full">
        {services.map((service, index) => {
          return (
            <Card
                key={service.title}
                title={t(`services.${index}.title` as keyof typeof t)}
                content={t(`services.${index}.shortDescription` as keyof typeof t)}
                image={service.image}
            >
                <Link href={routes.services.detail(service.id)}>
                    <Button style="accent" className="px-3 py-2 text-preset-5">{tCommon("readMore")}</Button>
                </Link>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
