"use client";
import React, { useMemo, useState } from "react";
import LayoutHome from "./layout";
import { Spinner } from "@nextui-org/react";

import { useQuery } from "@tanstack/react-query";
import { listPatient } from "@/services/patient";
import CreatePatient from "../components/Patient/create-patient";
import { Patient } from "../models/patient";
import { TableListPatient } from "../components/Patient/table-list-patient";

export function Home() {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["listPatients"],
    queryFn: listPatient,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  //table
  const rowsPerPage = 5;
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data && data.slice(start, end);
  }, [page, data]);

  return (
    <LayoutHome>
      <header className="flex items-center mt-4">
        <h1 className="text-white text-3xl">Pacientes</h1>
        <CreatePatient />
      </header>

      <div className="max-w-5x2 w-full m-auto mt-20 flex flex-col">
        {isFetching ? (
          <Spinner
            label="Loading..."
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        ) : (
          <TableListPatient
            page={page}
            setPage={setPage}
            items={items as Patient[]}
          />
        )}
      </div>
    </LayoutHome>
  );
}

export default Home;
