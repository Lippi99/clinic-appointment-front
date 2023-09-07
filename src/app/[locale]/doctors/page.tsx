"use client";
import { useQuery } from "@tanstack/react-query";
import LayoutDoctors from "./layout";
import { listDoctors } from "@/services/doctor";
import { CreateDoctor } from "../../components/Doctor/create-doctor";
import { Suspense, useState } from "react";
import { TableListDoctors } from "../../components/Doctor/table-list-doctors";
import { Doctor } from "../../models/doctor";
import Loading from "./loading";
import { useDebounce } from "@uidotdev/usehooks";
export default function Page() {
  const [name, setName] = useState("");
  const debouncedSearch = useDebounce(name, 500);
  const { data: doctors } = useQuery({
    queryKey: ["listDoctors", debouncedSearch],
    queryFn: () => listDoctors(debouncedSearch),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours,
  });

  return (
    <LayoutDoctors>
      <header className="flex items-center mt-4">
        <h1 className="text-white text-3xl">Médicos</h1>
        <CreateDoctor />
      </header>
      <div className="mt-5 mb-10 flex justify-end">
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Pesquise pelo médico..."
          className="text-white  bg-main-bg-darker max-w-xs border-none  w-full rounded-large outline-border-light p-2 border border-border-light"
          type="text"
        />
      </div>

      <div className="max-w-5x2 w-full m-auto mt-20 flex flex-col">
        <Suspense fallback={<Loading />}>
          <TableListDoctors doctors={doctors as Doctor[]} />
        </Suspense>
      </div>
    </LayoutDoctors>
  );
}
