"use client";

import { Patient, SignUpValidationSchema } from "@/app/models/patient";
import LayoutHome from "../layout";
import { format } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { listPatientById, updatePatientById } from "@/services/patient";
import { toast } from "react-toastify";

import { Button, Spinner } from "@nextui-org/react";
import Link from "next/link";
import Loading from "../loading";

const updatePatientSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  lastName: z.string().min(3, "O sobrenome deve ter no mínimo 3 caracteres"),
  birth: z
    .string({
      required_error: "A data de nascimento deve ser informada",
    })
    .refine(
      (data) => {
        const currentDate = new Date();
        return new Date(data) < currentDate;
      },
      {
        message: "A data de nascimento deve ser menor que a data atual",
      }
    ),
  address: z.string().min(3, "O endereço deve ser informado"),
  email: z.string().email("Informe seu e-mail"),
});

export default function Page({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();
  const { data: patient, isLoading } = useQuery({
    queryFn: () => listPatientById(params.id),
    queryKey: ["listPatientById", params.id],
    refetchOnWindowFocus: false,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpValidationSchema>({
    resolver: zodResolver(updatePatientSchema),
  });

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: (values: Patient) => updatePatientById(values, params.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["listPatientById"]);
      toast.success("Paciente atualizado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao atualizar paciente");
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleUpdatePatient: SubmitHandler<Patient> = async (data) => {
    mutate({ ...data, birth: new Date(data.birth).toISOString() });
  };

  return (
    <LayoutHome>
      <header className="flex items-center mt-4">
        <h1 className="text-white text-3xl">Paciente {patient?.name}</h1>
      </header>
      <form
        onSubmit={handleSubmit(handleUpdatePatient)}
        className="mt-8 max-w-lg w-full"
      >
        <div className="flex flex-col w-full mb-5">
          <input
            placeholder="Nome"
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            type="text"
            id="name"
            title="name"
            defaultValue={patient?.name}
            {...register("name")}
          />
        </div>
        <div className="flex flex-col w-full mb-5">
          <input
            placeholder="Sobrenome"
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            type="text"
            id="lastName"
            title="Sobrenome"
            defaultValue={patient?.lastName}
            {...register("lastName")}
          />
        </div>
        <div className="flex flex-col w-full mb-5">
          <input
            placeholder="E-mail"
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            type="email"
            id="email"
            title="email"
            defaultValue={patient?.email}
            {...register("email")}
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <input
            placeholder="Endereço"
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            type="text"
            id="address"
            title="address"
            defaultValue={patient?.address}
            {...register("address")}
          />
        </div>
        <div className="flex flex-col w-full">
          <input
            placeholder="Data de consulta"
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            type="date"
            id="birth"
            title="Data de nascimento"
            defaultValue={format(
              new Date(patient?.birth as string),
              "yyyy-MM-dd"
            )}
            {...register("birth")}
          />
        </div>
        <div className="flex items-center gap-5">
          <Button
            className="max-w-[15rem] w-full mt-5 flex items-center justify-center"
            color="primary"
            type="button"
          >
            <Link className="w-full" href="/patients">
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
    </LayoutHome>
  );
}
