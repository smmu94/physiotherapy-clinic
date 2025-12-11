"use client";

import { useState } from "react";
import { SERVICES_BOOKING } from "@/lib/constants";
import { useTranslations } from "next-globe-gen";
import BookingWidget from "@/components/ui/bookingWidget";

export default function ServicesBooking() {
  const t = useTranslations("booking");
  const [activeService, setActiveService] = useState(SERVICES_BOOKING[0].link);

  return (
    <div className="pt-10 flex flex-col gap-12 items-center w-full">
      <h1 className="text-preset-1 text-dark">{t("title")}</h1>
      <div className="bg-accent w-full flex flex-col items-center py-8 px-4 gap-8 md:gap-0 md:pb-0">
        <div className="flex flex-wrap gap-2 justify-center max-w-4xl">
        {SERVICES_BOOKING.map((service) => {
          const isActive = activeService === service.link;
          return (
            <button
              key={service.link}
              onClick={() => setActiveService(service.link)}
              className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-gray text-foreground hover:bg-neutral-medium"
              }`}
            >
              {t(service.name as keyof typeof t)}
            </button>
          );
        })}
      </div>
        <BookingWidget calLink={activeService} />
      </div>
    </div>
  );
}
