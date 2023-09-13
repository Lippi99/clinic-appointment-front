import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useMemo, useState } from "react";

import { Especialization } from "@/app/models/especialization";
import { formatDate } from "@/utils/date";
import { VisualizeEspecialization } from "./visualize-especialization";
import { DeleteEspecialization } from "./delete-especialization";
import { useTranslations } from "next-intl";

interface TableListEspecialization {
  data: Especialization[];
}

export const TableListEspecialization = ({
  data,
}: TableListEspecialization) => {
  const t = useTranslations("Index");

  const [page, setPage] = useState(1);

  const rowsPerPage = 10;
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data && data.slice(start, end);
  }, [page, data]);

  const pages = items && Math.ceil(data.length / rowsPerPage);

  const renderCell = React.useCallback(
    (especialization: Especialization, columnKey: any) => {
      const cellValue =
        especialization[columnKey as keyof typeof especialization];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm text-white">
                {especialization.name}
              </p>
            </div>
          );
        case "createdAt":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm text-white">
                {formatDate(especialization.createdAt)}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-5">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <VisualizeEspecialization especialization={especialization} />
              </span>
              <DeleteEspecialization especialization={especialization} />
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
        <TableColumn key="name">{t("especializations.table.name")}</TableColumn>
        <TableColumn key="createdAt">
          {t("especializations.table.created")}
        </TableColumn>
        <TableColumn key="actions">
          {t("especializations.table.actions")}
        </TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={
          <span className="text-white">
            {t("especializations.table.empty")}
          </span>
        }
        className="bg-main-bg-darker"
        items={items || []}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey) as string}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
