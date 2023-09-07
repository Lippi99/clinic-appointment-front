"use client";
import { listAppointmentById, updateAppointment } from "@/services/appointment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LayoutAppointments from "../layout";
import { listPatient } from "@/services/patient";
import { listDoctors } from "@/services/doctor";
import { Button } from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdateAppointment } from "@/app/models/appointment";
import Loading from "../loading";
import axios, { AxiosError } from "axios";
import ReactDatePicker from "react-datepicker";

const registerPatientSchema = z.object({
  patientId: z
    .string({
      required_error: "O nome do paciente deve ser informado",
    })
    .nonempty("O nome do paciente deve ser informado"),
  doctorId: z
    .string({
      required_error: "O nome médico deve ser informado",
    })
    .min(10, "O nome médico deve ser informado")
    .nonempty("O nome médico deve ser informado"),
  dateSchedule: z
    .string({
      required_error: "A data de consulta deve ser informada",
    })
    .nonempty("A data de consulta deve ser informada"),
  timeSchedule: z.string({
    required_error: "A hora de consulta deve ser informada",
  }),
});

export default function Page({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();

  const { data: pacients, isLoading } = useQuery({
    queryFn: () => listPatient(),
    queryKey: ["listPatients"],
    refetchOnWindowFocus: false,
  });
  const { data: doctors } = useQuery({
    queryFn: () => listDoctors(),
    queryKey: ["listDoctors"],
    refetchOnWindowFocus: false,
  });

  const { data: appointment } = useQuery({
    queryFn: () => listAppointmentById(params.id),
    queryKey: ["listAppointmentById", params.id],
    refetchOnWindowFocus: false,
  });

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateAppointment>({
    resolver: zodResolver(registerPatientSchema),
  });

  const { mutate: mutateUpdateAppointment, isLoading: isUpdating } =
    useMutation({
      mutationFn: (values: UpdateAppointment) =>
        updateAppointment(values, params.id),
      onSuccess: () => {
        queryClient.invalidateQueries(["listAppointmentById"]);
        toast.success("Consulta atualizada com sucesso!");
      },
      onError: (error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            toast.error("Já existe uma consulta nesse horário");
          } else {
            toast.error("Houve um erro ao atualizar a consulta");
          }
        }
      },
    });

  const handleUpdateAppointment: SubmitHandler<UpdateAppointment> = async (
    data
  ) => {
    mutateUpdateAppointment({
      ...data,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <LayoutAppointments>
      <header className="flex items-center mt-4">
        <h1 className="text-white text-3xl">Atualizar consulta</h1>
      </header>
      <form
        onSubmit={handleSubmit(handleUpdateAppointment)}
        className="mt-8 max-w-lg w-full"
      >
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg text-default-400 mb-3">
            Nome do paciente
          </label>

          <select
            id="patientId"
            title="Nome do paciente"
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            placeholder="Nome do paciente"
            {...register("patientId")}
            defaultValue={appointment?.patientId}
          >
            {pacients?.patients?.map((patient) => (
              <option
                key={patient.id}
                defaultValue={patient.id}
                className="hover:bg-main-bg-darker"
                value={patient.id}
              >
                {patient.name}
              </option>
            ))}
          </select>
          {errors.patientId && (
            <span className="text-red-light">{errors.patientId.message}</span>
          )}
        </div>
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg text-default-400 mb-3">
            Nome do médico
          </label>
          <select
            id="doctorId"
            title="Nome do médico"
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            placeholder="Nome do médico"
            {...register("doctorId")}
            defaultValue={appointment?.doctorId}
          >
            {doctors?.map((doctor) => (
              <option
                key={doctor.id}
                defaultValue={doctor.id}
                className="hover:bg-main-bg-darker"
                value={doctor.id}
              >
                {doctor.name}
              </option>
            ))}
          </select>
          {errors.doctorId && (
            <span className="text-red-light">{errors.doctorId.message}</span>
          )}
        </div>

        <div className="flex flex-col w-full">
          <label className="text-lg text-default-400 mb-3">
            Data da consulta
          </label>

          <Controller
            control={control}
            name="dateSchedule"
            defaultValue={appointment?.dateSchedule}
            render={({ field }) => (
              <ReactDatePicker
                className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                placeholderText="Consulta"
                onChange={(date) => field.onChange(date?.toISOString())}
                selected={field.value ? new Date(field.value) : null}
                dateFormat="dd/MM/yyyy"
                id="dateSchedule"
              />
            )}
          />

          {errors.dateSchedule && (
            <span className="text-red-light">
              {errors.dateSchedule.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label className="text-lg text-default-400 mb-3">
            Hora da consulta
          </label>
          <input
            placeholder="Consulta"
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            type="time"
            id="timeSchedule"
            title="timeSchedule"
            {...register("timeSchedule")}
            defaultValue={appointment?.timeSchedule}
          />
          {errors.timeSchedule && (
            <span className="text-red-light">
              {errors.timeSchedule.message}
            </span>
          )}
        </div>
        <div className="flex items-center gap-5">
          <Button
            className="max-w-[15rem] w-full mt-5 flex items-center justify-center"
            color="primary"
            type="button"
          >
            <Link className="w-full" href="/appointments">
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
