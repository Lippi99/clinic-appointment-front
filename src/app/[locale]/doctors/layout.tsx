import { createTranslator } from "next-intl";
import { Header } from "../../components/Header";
import { ReactToast } from "../../components/ReactToast";
import { Sidebar } from "../../components/Sidebar";

export async function generateMetadata({ params: { locale } }: any) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });

  return {
    title: t("Index.doctors.title"),
  };
}
export default function LayoutDoctors({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
