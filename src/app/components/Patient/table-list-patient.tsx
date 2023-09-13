import { Patient, PatientData } from "@/app/models/patient";
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
import React, { useMemo, useState } from "react";
import { VisualizePatient } from "./visualize-patient";
import Link from "next/link";
import { DeletePatient } from "./delete-patient";
import { EditIcon } from "../Icons/EditIcon";
import { formatDate } from "@/utils/date";
import { useTranslations } from "next-intl";

interface TableListPatientProps {
  data: PatientData;
}

export const TableListPatient = ({ data }: TableListPatientProps) => {
  const [page, setPage] = useState(1);
  const t = useTranslations("Index");

  const rowsPerPage = 10;
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data && data.patients.slice(start, end);
  }, [page, data]);

  const pages = items && Math.ceil(data.patients.length / rowsPerPage);

  const renderCell = React.useCallback((patient: Patient, columnKey: any) => {
    const cellValue = patient[columnKey as keyof typeof patient];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm text-white">{patient.name}</p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  text-white">{patient.email}</p>
          </div>
        );
      case "region":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  text-white">
              {patient.region ? patient.region : " - "}
            </p>
          </div>
        );
      case "lastName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm text-white">{patient.lastName}</p>
          </div>
        );
      case "birth":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm text-white">
              {formatDate(patient.birth)}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-5">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <VisualizePatient patient={patient} />
            </span>

            <Tooltip content={t("patients.table.tooltips.edit")}>
              <Link
                href={`/patients/${patient.id}`}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </Link>
            </Tooltip>

            <DeletePatient patient={patient} />
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
        <TableColumn key="name">{t("patients.table.name")}</TableColumn>
        <TableColumn key="email">{t("patients.table.email")}</TableColumn>
        <TableColumn key="region">{t("patients.table.region")}</TableColumn>
        <TableColumn key="birth">{t("patients.table.birth")}</TableColumn>
        <TableColumn key="actions">{t("patients.table.actions")}</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={
          <span className="text-white">{t("patients.table.empty")}</span>
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
