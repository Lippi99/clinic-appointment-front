"use client";
import Link from "next/link";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const path = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 bg-main-bg-darker h-full w-[15rem]">
      <ul className="pt-0 p-4 flex gap-10 flex-col m-auto mt-32 text-center">
        <li
          className={`rounded-xl w-11/12  ${
            path.includes("/patients") ? "bg-main-bg" : null
          }`}
        >
          <Link
            className="pt-4 pb-4 block w-full h-full text-white"
            href="/patients"
          >
            <AiOutlineUser
              AiOutlineUser
              className="inline-block text-3xl mr-4"
            />
            Pacientes
          </Link>
        </li>
        <li
          className={`rounded-xl w-11/12  ${
            path.includes("/appointments") ? "bg-main-bg" : null
          }`}
        >
          <Link
            className="pt-4 pb-4 flex items-center justify-center w-full h-full text-white"
            href="/appointments"
          >
            <AiOutlineCalendar
              AiOutlineUser
              className="inline-block text-3xl mr-4"
            />
            Consultas
          </Link>
        </li>
      </ul>
    </aside>
  );
};
