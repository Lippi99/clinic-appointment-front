import { Patient } from "@/app/models/patient";
import { formatDate } from "@/utils/date";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { VisualizePatient } from "./visualize-patient";
import Link from "next/link";
import { DeletePatient } from "./delete-patient";

interface TableListPatientProps {
  page: number;
  setPage: (value: number) => void;
  items: Patient[];
}

export const TableListPatient = ({
  items,
  page,
  setPage,
}: TableListPatientProps) => {
  const rowsPerPage = 5;
  const pages = items && Math.ceil(items.length / rowsPerPage);

  const renderCell = React.useCallback((user: Patient, columnKey: any) => {
    const cellValue = user[columnKey as keyof typeof user];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm text-white">{user.name}</p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  text-white">{user.email}</p>
          </div>
        );
      case "region":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  text-white">
              {user.region ? user.region : " - "}
            </p>
          </div>
        );
      case "lastName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm text-white">{user.lastName}</p>
          </div>
        );
      case "birth":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm text-white">
              {formatDate(user.birth)}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <VisualizePatient patient={user} />
            </span>

            <Link
              href={`/patients/${user.id}`}
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
            >
              Editar
            </Link>

            <DeletePatient patient={user} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      isStriped
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
        table: "bg-main-bg-darker rounded-lg overflow-hidden",
        emptyWrapper: "bg-main-bg-darker",
        wrapper: "min-h-[222px] bg-main-bg-darker",
        td: "text-white",
        th: "bg-main-bg-darker text-zinc-400 text-lg font-bold",
      }}
    >
      <TableHeader className="bg-main-bg-darker">
        <TableColumn key="name">Nome</TableColumn>
        <TableColumn key="email">E-mail</TableColumn>
        <TableColumn key="region">Região</TableColumn>
        <TableColumn key="birth">Nascimento</TableColumn>
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
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
