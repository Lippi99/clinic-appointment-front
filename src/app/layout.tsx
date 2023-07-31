import "./globals.css";
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/DoctorAuth";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
