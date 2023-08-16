import { Suspense } from "react";
import { Header } from "../components/Header";
import { ReactToast } from "../components/ReactToast";
import { Sidebar } from "../components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pacientes",
  description: "cadastro de pacientes",
};
export default function Layout({ children }: { children: React.ReactNode }) {
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
