"use client";

import { ToastContainer } from "react-toastify";

export const ReactToast = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};
