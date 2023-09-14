"use client";
import { useTranslations } from "next-intl";
import { Header } from "../../components/Header";
import { ReactToast } from "../../components/ReactToast";
import { Sidebar } from "../../components/Sidebar";

export default function LayoutDoctors({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Index");
  return (
    <>
      <title>{t("doctors.title")}</title>
      <Header />
      <Sidebar />
      <main className="h-full">
        <section className="absolute left-32 top-10 right-0 bottom-0 p-10">
          <ReactToast>{children}</ReactToast>
        </section>
      </main>
    </>
  );
}
