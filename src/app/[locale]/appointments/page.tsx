"use client";
import { useQuery } from "@tanstack/react-query";
import LayoutAppointments from "./layout";
import { listAppointments } from "@/services/appointment";
import { TableListAppointments } from "../../components/Appointment/table-list-appointments";
import { Appointment } from "../../models/appointment";
import CreateAppointment from "../../components/Appointment/create-appointment";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import Loading from "./loading";

export default function Appointments() {
  const [name, setName] = useState("");
  const debouncedSearch = useDebounce(name, 500);

  const { data, isFetching } = useQuery({
    queryKey: ["listAppointments", debouncedSearch],
    queryFn: () => listAppointments(debouncedSearch),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours,
    refetchOnWindowFocus: false,
  });

  return (
    <LayoutAppointments>
      <header className="flex items-center mt-4">
        <h1 className="text-white text-3xl">Consultas</h1>
        <CreateAppointment />
      </header>
      <div className="mt-5 mb-10 flex justify-end">
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Pesquise pela consulta..."
          className="text-white  bg-main-bg-darker max-w-xs border-none  w-full rounded-large outline-border-light p-2 border border-border-light"
          type="text"
        />
      </div>

      <div className="max-w-5x2 w-full m-auto mt-20 flex flex-col">
        {isFetching ? (
          <Loading />
        ) : (
          <TableListAppointments data={data as Appointment[]} />
        )}
      </div>
    </LayoutAppointments>
  );
}
