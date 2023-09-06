"use client";
import Link from "next/link";
import {
  AiOutlineCalendar,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { CiStethoscope } from "react-icons/ci";
import { GiSkills } from "react-icons/gi";
import nookies from "nookies";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/react";

export const Sidebar = () => {
  const path = usePathname();
  const Router = useRouter();

  const logout = () => {
    nookies.destroy(null, "doceifancia.auth");
    Router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 bg-main-bg-darker h-full w-[15rem]">
      <ul className="pt-0 p-4 flex gap-10 flex-col m-auto mt-32 text-center">
        <li
          className={`rounded-xl w-11/12  ${
            path.includes("/patients") ? "bg-main-bg" : null
          }`}
        >
          <Link
            className="pt-4 pb-4 flex items-center justify-evenly w-full h-full text-white"
            href="/patients"
          >
            <AiOutlineUser
              AiOutlineUser
              className="inline-block text-3xl mr-4"
            />
            <span>Pacientes</span>
          </Link>
        </li>
        <li
          className={`rounded-xl w-11/12  ${
            path.includes("/doctors") ? "bg-main-bg" : null
          }`}
        >
          <Link
            className="pt-4 pb-4 flex items-center justify-evenly w-full h-full text-white"
            href="/doctors"
          >
            <CiStethoscope
              AiOutlineUser
              className="inline-block text-3xl mr-4"
            />
            <span>Médicos</span>
          </Link>
        </li>
        <li
          className={`rounded-xl w-11/12  ${
            path.includes("/appointments") ? "bg-main-bg" : null
          }`}
        >
          <Link
            className="pt-4 pb-4 flex items-center justify-evenly w-full h-full text-white"
            href="/appointments"
          >
            <AiOutlineCalendar
              AiOutlineUser
              className="inline-block text-3xl mr-4"
            />
            <span>Consultas</span>
          </Link>
        </li>
        <li
          className={`rounded-xl w-11/12  ${
            path.includes("/especializations") ? "bg-main-bg" : null
          }`}
        >
          <Link
            className="pt-4 pb-4 flex items-center justify-evenly w-full h-full text-white"
            href="/especializations"
          >
            <GiSkills AiOutlineUser className="inline-block text-3xl mr-4" />
            <span>Especializações</span>
          </Link>
        </li>

        <li>
          <Tooltip content="Sair">
            <button
              className="pt-4 pb-4 flex items-center justify-evenly w-full h-full outline-0 border-0 text-[#f31260]"
              title="Sair"
              onClick={logout}
            >
              <AiOutlineLogout />
            </button>
          </Tooltip>
        </li>
      </ul>
    </aside>
  );
};
