"use client";

import { NextUIProvider } from "@nextui-org/react";
import "react-datepicker/dist/react-datepicker.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
