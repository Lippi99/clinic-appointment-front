"use client";
import { Spinner } from "@nextui-org/react";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("Index");
  return (
    <Spinner
      label={t("loading")}
      color="success"
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    />
  );
}
