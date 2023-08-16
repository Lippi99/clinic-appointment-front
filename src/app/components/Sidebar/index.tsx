import Link from "next/link";

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 bg-main-bg-darker h-full w-[15rem]">
      <ul className="ml-14 flex flex-col m-auto mt-36">
        <li className="mb-4">
          <Link className="text-white" href="/patients">
            Pacientes
          </Link>
        </li>
        <li className="mb-4">
          <a className="text-white" href="">
            Consultas
          </a>
        </li>
      </ul>
    </aside>
  );
};
