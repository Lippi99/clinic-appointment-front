import "./globals.css";
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AdminAuth";
import { Providers } from "./providers";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt" }];
}

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className="dark bg-main-bg">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ReactQueryProvider>
          <AuthProvider>
            <body>
              <Providers>{children}</Providers>
            </body>
          </AuthProvider>
        </ReactQueryProvider>
      </NextIntlClientProvider>
    </html>
  );
}
