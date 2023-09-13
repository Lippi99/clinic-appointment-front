"use client";
import { Suspense } from "react";
import CreateEspecialization from "../../components//Especialization/create-especialization";
import LayoutSpecializations from "./layout";
import Loading from "./loading";
import { TableListEspecialization } from "../../components/Especialization/table-list-especialization";
import { useQuery } from "@tanstack/react-query";
import { listEspecializations } from "@/services/especialization";
import { Especialization } from "../../models/especialization";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Index");
  const { data } = useQuery({
    queryKey: ["listEspecializations"],
    queryFn: listEspecializations,
    refetchOnWindowFocus: false,
  });

  return (
    <LayoutSpecializations>
      <header className="flex items-center mt-4">
        <h1 className="text-white text-3xl">{t("especializations.title")}</h1>
        <CreateEspecialization />
      </header>

      <div className="max-w-5x2 w-full m-auto mt-20 flex flex-col">
        <Suspense fallback={<Loading />}>
          <TableListEspecialization data={data as Especialization[]} />
        </Suspense>
      </div>
    </LayoutSpecializations>
  );
}
