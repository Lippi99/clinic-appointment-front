"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LayoutAppointments from "../layout";
import { listDoctor, updateDoctor } from "@/services/doctor";
import { Button } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loading from "../loading";
import axios, { AxiosError } from "axios";
import { DoctorUpdate } from "@/app/models/doctor";

const registerDoctorSchema = z.object({
  name: z
    .string({
      required_error: "O nome do médico deve ser informado",
    })
    .min(3, "O nome do médico deve ser informado"),
  email: z
    .string({
      required_error: "O email deve ser informado",
    })
    .email("O email deve ser válido"),
  specialization: z.string({
    required_error: "A especialização deve ser informada",
  }),
});

export default function Page({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();

  const { data: doctor, isLoading } = useQuery({
    queryFn: () => listDoctor(params.id),
    queryKey: ["listDoctor", params.id],
    refetchOnWindowFocus: false,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<DoctorUpdate>({
    resolver: zodResolver(registerDoctorSchema),
  });

  const { mutate: mutateUpdateDoctor, isLoading: isUpdating } = useMutation({
    mutationFn: (values: DoctorUpdate) => updateDoctor(values, params.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["listDoctor"]);
      toast.success("Médico atualizado com sucesso!");
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error("Médico não encontrado");
        } else {
          toast.error("Houve um erro ao atualizar o médico");
        }
      }
    },
  });

  const handleUpdateDoctor: SubmitHandler<DoctorUpdate> = (data) => {
    mutateUpdateDoctor({ ...data });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <LayoutAppointments>
      <header className="flex items-center mt-4">
        <h1 className="text-white text-3xl">Médico {doctor?.name}</h1>
      </header>
      <form
        onSubmit={handleSubmit(handleUpdateDoctor)}
        className="mt-8 max-w-lg w-full"
      >
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg text-default-400 mb-3">
            Nome do médico
          </label>

          <input
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            type="text"
            id="name"
            title="Nome do médico"
            {...register("name")}
            defaultValue={doctor?.name}
          />
          {errors.name && (
            <span className="text-red-light">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg text-default-400 mb-3">
            E-mail do médico
          </label>
          <input
            type="text"
            id="email"
            title="E-mail do médico"
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            placeholder="E-mail do médico"
            {...register("email")}
            defaultValue={doctor?.email}
          />

          {errors.email && (
            <span className="text-red-light">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col w-full">
          <label className="text-lg text-default-400 mb-3">
            Especialização
          </label>

          <select
            id="specializationId"
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            {...register("specializationId")}
            defaultValue={doctor?.specialization.id}
          >
            <option
              key={doctor?.specialization.id}
              defaultValue={doctor?.specialization.id}
              value={doctor?.specialization.id}
            >
              {doctor?.specialization.name}
            </option>
          </select>

          {errors.specializationId && (
            <span className="text-red-light">
              {errors.specializationId.message}
            </span>
          )}
        </div>

        <div className="flex items-center gap-5">
          <Button
            className="max-w-[15rem] w-full mt-5 flex items-center justify-center"
            color="primary"
            type="button"
          >
            <Link className="w-full" href="/doctors">
              Voltar
            </Link>
          </Button>
          <Button
            className="max-w-[15rem] w-full mt-5"
            disabled={isUpdating}
            type="submit"
            color="primary"
          >
            {isUpdating ? "Atualizando..." : "Atualizar"}
          </Button>
        </div>
      </form>
    </LayoutAppointments>
  );
}
