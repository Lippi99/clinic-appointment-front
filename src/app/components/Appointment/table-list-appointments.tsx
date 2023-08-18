import { Appointment } from "@/app/models/appointment";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { VisualizeAppointment } from "./visualize-appointment";
import { EditIcon } from "../Icons/EditIcon";
import { DeleteAppointment } from "./delete-appointment";
import { format } from "date-fns";

interface TableListAppointmentsProps {
  data: Appointment[];
}

export const TableListAppointments = ({ data }: TableListAppointmentsProps) => {
  const [page, setPage] = useState(1);

  const rowsPerPage = 10;
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data && data.slice(start, end);
  }, [page, data]);

  const pages = items && Math.ceil(data.length / rowsPerPage);

  const renderCell = React.useCallback(
    (appointment: Appointment, columnKey: any) => {
      const cellValue = appointment[columnKey as keyof typeof appointment];

      switch (columnKey) {
        case "doctorName":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm text-white">
                {appointment.doctor.name}
              </p>
            </div>
          );
        case "patientName":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm  text-white">
                {appointment.patient.name}
              </p>
            </div>
          );
        case "dateSchedule":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm  text-white">
                {format(
                  new Date(appointment.dateSchedule as string),
                  "dd/MM/yyyy"
                )}
              </p>
            </div>
          );
        case "timeSchedule":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm  text-white">
                {appointment.timeSchedule}
              </p>
            </div>
          );

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <VisualizeAppointment
                  appointment={appointment as Appointment}
                />
              </span>
              <Tooltip content="Editar consulta">
                <Link
                  href={`/appointments/${appointment.id}`}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </Link>
              </Tooltip>
              <DeleteAppointment appointment={appointment} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-end">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages as number}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        table: "bg-main-bg rounded-lg overflow-hidden",
        emptyWrapper: "bg-main-bg",
        wrapper: "min-h-[222px] bg-main-bg-darker p-0 overflow-hidden",
        td: "text-white p-5 border-b-1 border-slate-500",
        th: "bg-main-bg text-zinc-400 text-lg font-bold text-white p-5 border-b-1 border-slate-500",
      }}
    >
      <TableHeader className="bg-main-bg-darker">
        <TableColumn key="doctorName">Nome do médico</TableColumn>
        <TableColumn key="patientName">Nome do paciente</TableColumn>
        <TableColumn key="dateSchedule">Data da consulta</TableColumn>
        <TableColumn key="timeSchedule">Hora da consulta</TableColumn>
        <TableColumn key="actions">Ações</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={
          <span className="text-white">Nenhum dado encontrado</span>
        }
        className="bg-main-bg-darker"
        items={items || []}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey) as any}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
