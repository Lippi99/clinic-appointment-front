"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useAdminAuth } from "../context/AdminAuth";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@nextui-org/react";
import { TransLation } from "../components/Translation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("Index");

  const loginSchema = z.object({
    email: z.string().email(t("login.error.email")),
    password: z.string().min(6, t("login.error.password")),
  });

  type LoginValidationSchema = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { signIn, ToastAdminAuth } = useAdminAuth();

  const handleLogin: SubmitHandler<LoginValidationSchema> = async (data) => {
    setIsLoading(true);
    try {
      await signIn(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen bg-main-bg">
      <div className="absolute right-10 top-10">
        <TransLation />
      </div>
      <div className="shadow-box-shadow-login bg-main-bg-darker max-w-lg w-full absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 rounded-2xl p-10">
        <h1 className="text-3xl text-white uppercase text-center mb-8">
          Login
        </h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex items-center justify-center flex-col"
        >
          <div className="max-w-xs w-full mb-5">
            <input
              placeholder={t("login.email")}
              className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
              type="email"
              id="name"
              title="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-light">{errors.email.message}</span>
            )}
          </div>
          <div className="max-w-xs w-full mb-5">
            <input
              placeholder={t("login.password")}
              className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
              type="password"
              id="password"
              title="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-light">{errors.password.message}</span>
            )}
          </div>

          <Button
            disabled={isLoading}
            className="mt-5 bg-green-darker text-white p-3 w-full max-w-[150px] rounded-md"
            type="submit"
          >
            {isLoading ? t("login.submit.loading") : t("login.submit.text")}
          </Button>
        </form>
      </div>
      <ToastAdminAuth />
    </main>
  );
}
