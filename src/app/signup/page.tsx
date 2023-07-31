"use client";

import { createPatient } from "@/services/patient";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpValidationSchema } from "../models/patient";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError, isAxiosError } from "axios";
import NextLink from "next/link";

const signUpSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  lastName: z.string().min(3, "O sobrenome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Informe seu e-mail"),
  date: z.string().min(10, "Informe uma data válida"),
  region: z.string().min(3, "Informe uma região válida"),
  address: z.string().min(3, "Informe um endereço válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});
export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpValidationSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const [loading, setIsLoading] = useState(false);

  const handleSignUp: SubmitHandler<SignUpValidationSchema> = async (data) => {
    const newData = {
      ...data,
      birth: new Date(data.date),
    };

    setIsLoading(true);
    try {
      await createPatient(newData);
      setIsLoading(false);
      toast.success("Cadastro realizado com sucesso!");
      reset();
    } catch (error: unknown | AxiosError) {
      if (isAxiosError(error)) {
        toast.error("Houve um erro ao cadastrar o paciente");
      } else {
        toast.error("Paciente já cadastrado");
      }
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen bg-main-bg">
      <div className="shadow-box-shadow-login bg-main-bg-darker max-w-lg w-full absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 rounded-2xl p-10">
        <h1 className="text-3xl text-white uppercase text-center mb-8">
          Cadastrar
        </h1>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex items-center justify-center flex-col"
        >
          <div className="w-full mb-5 flex gap-5">
            <div className="flex flex-col w-full">
              <input
                placeholder="Nome"
                className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                type="text"
                id="name"
                title="Nome"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-light">{errors.name.message}</span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <input
                placeholder="Sobrenome"
                className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                type="text"
                id="lastName"
                title="Sobrenome"
                {...register("lastName")}
              />
              {errors.lastName && (
                <span className="text-red-light">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full mb-5 flex gap-5">
            <div className="flex flex-col w-full">
              <input
                placeholder="E-mail"
                className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                type="email"
                id="email"
                title="E-mail"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-light">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="w-full mb-5 flex gap-5">
            <div className="flex flex-col w-full">
              <input
                placeholder="DD/MM/AAAA"
                className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                type="date"
                id="date"
                title="Data de nascimento"
                {...register("date")}
              />
              {errors.date && (
                <span className="text-red-light">{errors.date.message}</span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <input
                placeholder="Cidade - Estado"
                className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                type="text"
                id="region"
                title="Região"
                {...register("region")}
              />
              {errors.region && (
                <span className="text-red-light">{errors.region.message}</span>
              )}
            </div>
          </div>

          <div className="w-full mb-5 flex gap-5">
            <div className="flex flex-col w-full">
              <input
                placeholder="Endereço"
                className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                type="text"
                id="address"
                title="Endereço"
                {...register("address")}
              />
              {errors.address && (
                <span className="text-red-light">{errors.address.message}</span>
              )}
            </div>
          </div>
          <div className="w-full mb-5 flex gap-5">
            <div className="flex flex-col w-full">
              <input
                placeholder="Senha"
                className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                type="password"
                id="password"
                title="Senha"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-light">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <button
            disabled={loading}
            className="mt-5 bg-green-darker text-white p-3 w-full max-w-[150px] rounded-md"
            type="submit"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
        <div className="text-center mt-5">
          <span className="text-white">
            Já possui uma conta? Clique
            <NextLink href="/" className="ml-2 text-green-light underline">
              aqui
            </NextLink>
          </span>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
