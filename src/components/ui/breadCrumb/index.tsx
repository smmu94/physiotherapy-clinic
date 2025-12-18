"use client";

import { Breadcrumbs } from "@/components/tailframes/breadcrumbs/breadcrumbs";
import { BreadCrumbProps } from "./types";

export default function BreadCrumb({ breadcrumb }: BreadCrumbProps) {
  return (
    <Breadcrumbs
      items={breadcrumb.map((route) => ({
        label: route.title,
        href: route.href,
      }))}
    />
  );
}
