import Button from "@/components/ui/button";
import { EXTENDED_TEAM_MEMBERS } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { getTranslations, Link } from "next-globe-gen";
import Image from "next/image";

export default function About() {
    const t = getTranslations("about");
    return (
        <div className="w-full flex flex-col justify-center items-center bg-gray">
            <section className="max-w-4xl w-full flex flex-col gap-8 py-12 items-center px-4">
                <h1 className="text-preset-1 text-dark">{t("title")}</h1>
                <p className="text-preset-4 text-primary">{t("description")}</p>
                <div className="flex flex-wrap gap-8 text-dark justify-center">
                    <div className="flex flex-col gap-2 bg-white rounded-lg max-w-sm w-full p-6">
                        <h2 className="text-preset-3-bold">{t("mission.title")}</h2>
                        <p className="text-preset-5">{t("mission.description")}</p>
                    </div>
                    <div className="flex flex-col gap-2 bg-white rounded-lg max-w-sm w-full p-6">
                        <h2 className="text-preset-3-bold">{t("vision.title")}</h2>
                        <p className="text-preset-5">{t("vision.description")}</p>
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center gap-12 p-12 bg-primary/50 w-full">
                <h2 className="text-preset-2 text-foreground">{t("history.title")}</h2>
                <div className="relative max-w-4xl w-full flex flex-col gap-12">
                    <div className="absolute top-0 bottom-0 left-12 w-1 bg-white"></div>
                    <div className="flex items-start gap-4 relative pl-24">
                    <div className="w-6 h-6 bg-neutral-light rounded-full absolute left-12 top-2"></div>
                    <div className="flex flex-col">
                        <span className="text-preset-3-bold">2008</span>
                        <p className="text-preset-3-bold">{t("history.beginning.title")}</p>
                        <p className="text-preset-5 max-w-xl">
                        {t("history.beginning.description")}
                        </p>
                    </div>
                    </div>
                    <div className="flex items-start gap-4 relative pl-24">
                    <div className="w-6 h-6 bg-accent rounded-full absolute left-12 top-2"></div>
                    <div className="flex flex-col">
                        <span className="text-preset-3-bold">2015</span>
                        <p className="text-preset-3-bold">{t("history.growth.title")}</p>
                        <p className="text-preset-5 max-w-xl">
                            {t("history.growth.description")}
                        </p>
                    </div>
                    </div>
                    <div className="flex items-start gap-4 relative pl-24">
                    <div className="w-6 h-6 bg-dark rounded-full absolute left-12 top-2"></div>
                    <div className="flex flex-col">
                        <span className="text-preset-3-bold">{t("history.now.title")}</span>
                        <p className="text-preset-3-bold">{t("history.now.subtitle")}</p>
                        <p className="text-preset-5 max-w-xl">{t("history.now.description")}</p>
                    </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-8 items-center justify-center p-12 w-full max-w-6xl">
                <h1 className="text-preset-2 text-dark"></h1>
                <div className="flex flex-wrap gap-8 justify-center">
                    {EXTENDED_TEAM_MEMBERS.map(({ image, name, role, description }, index) => (
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
                            className="h-40 w-40 rounded-full border-4 border-accentAbout objectAbout-cover"
                            width={160}
                            height={160}
                        />
                        <h3 className="text-preset-4-bold">{t(name)}</h3>
                        <p className="text-preset-5-bold text-primary">{t(role)}</p>
                        <p className="text-preset-5 text-neutral-dark">{t(description)}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="flex flex-col items-center gap-8 p-12 bg-dark w-full text-center">
                <h3 className="text-preset-2 text-white">{t("team.cta.title")}</h3>
                <p className="text-preset-3 text-white">{t("team.cta.description")}</p>
                <Link href={routes.booking}>
                    <Button style="accent">{t("team.cta.booking")}</Button>
                </Link>
            </section>
        </div>
    );
}