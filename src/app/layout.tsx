import "./globals.css";
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/DoctorAuth";
import { Providers } from "./providers";
import { ReactQueryProvider } from "./ReactQueryProvider";

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
    <html lang="en" className="dark bg-main-bg">
      <ReactQueryProvider>
        <AuthProvider>
          <body>
            <Providers>{children}</Providers>
          </body>
        </AuthProvider>
      </ReactQueryProvider>
    </html>
  );
}
