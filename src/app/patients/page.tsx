"use client";
import React, { useEffect, useState } from "react";
import LayoutHome from "./layout";

import { useQuery } from "@tanstack/react-query";
import { listPatient } from "@/services/patient";
import CreatePatient from "../components/Patient/create-patient";
import { Patient } from "../models/patient";
import { TableListPatient } from "../components/Patient/table-list-patient";

import Loading from "./loading";
import { useDebounce } from "@uidotdev/usehooks";

export function Home() {
  const [name, setName] = useState("");
  const debouncedSearch = useDebounce(name, 500);

  const { data, isFetching } = useQuery(
    ["listPatients", debouncedSearch],
    () => listPatient(debouncedSearch),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <LayoutHome>
      <header className="flex items-center mt-4">
        <h1 className="text-white text-3xl">Pacientes</h1>
        <CreatePatient />
      </header>
      <div className="mt-5 mb-10 flex justify-end">
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Pesquise pelo paciente..."
          className="text-white  bg-main-bg-darker max-w-xs border-none  w-full rounded-large outline-border-light p-2 border border-border-light"
          type="text"
        />
      </div>

      <div className="max-w-5x2 w-full m-auto mt-20 flex flex-col">
        {isFetching ? (
          <Loading />
        ) : (
          <TableListPatient data={data as Patient[]} />
        )}
      </div>
    </LayoutHome>
  );
}

export default Home;
