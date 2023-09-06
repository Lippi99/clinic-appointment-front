import { Doctor } from "@/app/models/doctor";
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
import { useCallback, useMemo, useState } from "react";
import { EditIcon } from "../Icons/EditIcon";
import { VisualizeDoctor } from "./visualize-doctor";
import { DeleteDoctor } from "./delete-doctor";

interface TableListDoctorProps {
  doctors: Doctor[];
}

export const TableListDoctors = ({ doctors }: TableListDoctorProps) => {
  const [page, setPage] = useState(1);

  const rowsPerPage = 10;
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return doctors && doctors.slice(start, end);
  }, [page, doctors]);

  const pages = items && Math.ceil(doctors.length / rowsPerPage);

  const renderCell = useCallback((doctor: Doctor, columnKey: any) => {
    const cellValue = doctor[columnKey as keyof typeof doctor];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm text-white">{doctor.name}</p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  text-white">{doctor.email}</p>
          </div>
        );
      case "specialization":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  text-white">
              {doctor.specialization.name ? doctor.specialization.name : " - "}
            </p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-5">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <VisualizeDoctor doctor={doctor} />
            </span>

            <DeleteDoctor doctor={doctor} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
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
        <TableColumn key="name">Nome</TableColumn>
        <TableColumn key="email">E-mail</TableColumn>
        <TableColumn key="specialization">Especialização</TableColumn>
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
