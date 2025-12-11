"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

type Props = {
  calLink: string;
};

export default function BookingWidget({ calLink }: Props) {
  const namespace = calLink.replace("/", "-");

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace });
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": "#26484A" },
          dark: { "cal-brand": "#26484A" },
        },
      });
    })();
  }, [namespace, calLink]);

  return (
    <Cal
      key={calLink}
      namespace={namespace}
      calLink={`elon-physio/${calLink}`}
      style={{
        width: "100%",
        height: "75vh",
        maxHeight: "1000px",
        overflowY: "auto",
      }}
      config={{ layout: "month_view", theme: "light" }}
    />
  );
}
