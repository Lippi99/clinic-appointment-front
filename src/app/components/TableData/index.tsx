// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Pagination,
// } from "@nextui-org/react";
// import { ReactNode } from "react";

// interface TableDataProps<T> {
//   page: number;
//   setPage: (page: number) => void;
//   total: number;
//   data: Array<T>;
// }

// interface TableDataProps<T> {
//   page: number;
//   setPage: (page: number) => void;
//   total: number;
//   data: Array<T>;
// }

// export function TableData<T>({
//   page,
//   setPage,
//   total,
//   data,
// }: TableDataProps<T>) {
//   function formatDate(date: string) {
//     const d = new Date(date);
//     const month = d.getMonth() + 1;
//     const day = d.getDate();
//     const year = d.getFullYear();
//     return `${month}/${day}/${year}`;
//   }
//   return (
//     <Table
//       isStriped
//       aria-label="Example table with client side pagination"
//       bottomContent={
//         <div className="flex w-full justify-end">
//           <Pagination
//             isCompact
//             showControls
//             showShadow
//             color="primary"
//             page={page}
//             total={total as number}
//             onChange={(page) => setPage(page)}
//           />
//         </div>
//       }
//       classNames={{
//         table: "bg-main-bg-darker rounded-lg overflow-hidden",
//         emptyWrapper: "bg-main-bg-darker",
//         wrapper: "min-h-[222px] bg-main-bg-darker",
//         td: "text-white",
//         th: "bg-main-bg-darker text-zinc-400 text-lg font-bold",
//       }}
//     >
//       <TableHeader className="bg-main-bg-darker">
//         <TableColumn key="name">Nome</TableColumn>
//         <TableColumn key="email">E-mail</TableColumn>
//         <TableColumn key="role">Tipo de usuário</TableColumn>
//         <TableColumn key="region">Região</TableColumn>
//         <TableColumn key="birth">Nascimento</TableColumn>
//       </TableHeader>
//       <TableBody className="bg-main-bg-darker" items={data}>
//         {(item) => (
//           <TableRow key={item.id}>
//             {(columnKey) => (
//               <TableCell>
//                 {columnKey === "birth"
//                   ? formatDate(item[columnKey as keyof typeof item])
//                   : item[columnKey as keyof typeof item]}
//               </TableCell>
//             )}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }
