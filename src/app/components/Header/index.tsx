"use client";
import { TransLation } from "../Translation";
export const Header = () => {
  return (
    <>
      <header className=" z-10 fixed right-0 left-0 top-0 pl-16 pr-16 h-20 bg-main-bg-darker">
        <nav className="flex items-center justify-between h-20">
          <div></div>
          <div className="flex items-center">
            <TransLation />
            <h1 className="text-white text-xl">Perfil</h1>
          </div>
        </nav>
      </header>
    </>
  );
};
