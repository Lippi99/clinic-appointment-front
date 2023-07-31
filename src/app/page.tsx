"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import NextLink from "next/link";
import { signInDoctor } from "@/services/doctor";
import { useDoctorAuth } from "./context/DoctorAuth";

type LoginValidationSchema = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  email: z.string().email("Informe seu e-mail"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});
export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { signIn, isLoading, ToastDoctorAuth } = useDoctorAuth();

  const handleLogin: SubmitHandler<LoginValidationSchema> = async (data) => {
    try {
      await signIn(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-screen bg-main-bg">
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
              placeholder="Digite seu E-mail"
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
              placeholder="Digite sua senha"
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

          <button
            disabled={isLoading}
            className="mt-5 bg-green-darker text-white p-3 w-full max-w-[150px] rounded-md"
            type="submit"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <div className="text-center mt-5">
          <span className="text-white">
            Ou registre-se, clicando aqui
            <NextLink
              href="/signup"
              className="ml-2 text-green-light underline"
            >
              aqui
            </NextLink>
          </span>
        </div>
      </div>
      <ToastDoctorAuth />
    </main>
  );
}
