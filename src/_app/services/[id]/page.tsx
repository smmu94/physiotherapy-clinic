import Button from "@/components/ui/button";
import { getServices } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { getTranslations, Link, getLocale } from "next-globe-gen";
import Image from "next/image";

export default async function ServicesDetailPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
    const locale = getLocale();
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const service = getServices(locale).find((s) => s.id === id);
    const t = getTranslations("services");

    if (!service) {
        return <div className="text-center mt-20 text-red-500">Servicio no encontrado</div>;
    }

    return (
        <article className="w-full flex flex-col justify-center items-center bg-white text-foreground">
        <div className="py-8 flex flex-col items-center gap-16 max-w-5xl w-full px-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-preset-1 text-dark text-center capitalize">{service.title}</h1>
                <p className="text-preset-4 text-foreground text-center">{service.shortDescription}</p>
            </div>
            <div className="relative w-full h-[350px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover brightness-90"
                loading="eager"
            />
            </div>
            <div className="w-full flex flex-col gap-8">
                <p className="text-preset-4 text-foreground leading-relaxed text-justify">
                {service.description}
                </p>
                <div className="bg-white p-6 flex flex-col gap-4">
                    <h3 className="text-preset-2 text-dark">{t("benefits")}</h3>
                    <ul className="flex flex-wrap gap-2">
                    {service.benefits.map((benefit) => (
                        <li key={benefit} className="text-dark px-4 py-3 rounded-lg bg-accent">
                        <span>{benefit}</span>
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="bg-white p-6 flex flex-col gap-4">
                    <h3 className="text-preset-2 text-dark">{t("techniques")}</h3>
                    <ul className="flex flex-wrap gap-2">
                    {service.techniques.map((technique) => (
                        <li key={technique} className="text-dark px-4 py-3 rounded-lg bg-accent">
                        <span>{technique}</span>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-4 items-center bg-primary py-16 w-full">
            <h3 className="text-preset-2 text-gray text-center">{t("cta.title")}</h3>
            <p className="text-preset-3">{t("cta.description")}</p>
            <Link href={routes.booking}>
                <Button style="secondary">{t("cta.button")}</Button>
            </Link>
            </div>
        </article>
    );
}
