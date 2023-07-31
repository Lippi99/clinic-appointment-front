import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export default function Layouty({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full bg-main-bg">
      <Header />
      <Sidebar />
      <section className="absolute left-32 top-10 right-0 bottom-0">
        {children}
      </section>
    </main>
  );
}
