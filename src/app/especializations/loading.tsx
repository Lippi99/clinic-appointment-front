"use client";
import { Spinner } from "@nextui-org/react";
export default function Loading() {
  return (
    <Spinner
      label="Carregando..."
      color="success"
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    />
  );
}
