import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listPatient } from "@/services/patient";
import { toast } from "react-toastify";
import { listDoctors } from "@/services/doctor";
import { CreateAppointment } from "@/app/models/appointment";
import { createAppointment } from "@/services/appointment";

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

export default function CreateAppointment() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateAppointment>({
    resolver: zodResolver(registerPatientSchema),
  });

  const queryClient = useQueryClient();

  const { data: pacients } = useQuery({
    queryFn: () => listPatient(""),
    queryKey: ["listPatients"],
    refetchOnWindowFocus: false,
  });
  const { data: doctors } = useQuery({
    queryFn: () => listDoctors(),
    queryKey: ["listDoctors"],
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateCreateAppointment, isLoading } = useMutation(
    createAppointment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["listAppointments"]);
        reset();
        onClose();
        toast.success("Consulta criada com sucesso!");
      },
      onError: () => {
        toast.error("Houve um erro ao cadastrar a consulta", {
          delay: 10,
        });
      },
    }
  );

  const handleRegisterAppoitment: SubmitHandler<CreateAppointment> = (data) => {
    mutateCreateAppointment({
      ...data,
      dateSchedule: new Date(data.dateSchedule),
    });
  };

  return (
    <>
      <Button
        className="bg-main-bg-darker rounded-full text-lg max-w-[20rem] w-full p-3 text-white cursor-pointer ml-5"
        onPress={onOpen}
      >
        Cadastrar
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="opaque"
        className="bg-main-bg-darker"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Cadastrar consulta
            </ModalHeader>
            <form onSubmit={handleSubmit(handleRegisterAppoitment)}>
              <ModalBody>
                <div className="flex flex-col w-full mb-5">
                  <label className="text-lg text-default-400 mb-3">
                    Nome do paciente
                  </label>
                  <select
                    id="patientId"
                    title="Id do paciente"
                    className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                    placeholder="Nome do paciente"
                    {...register("patientId")}
                  >
                    <option value="" disabled selected>
                      Selecione um paciente
                    </option>
                    {pacients?.map((pacient) => (
                      <option key={pacient.id} value={pacient.id}>
                        {pacient.name}
                      </option>
                    ))}
                  </select>
                  {errors.patientId && (
                    <span className="text-red-light">
                      {errors.patientId.message}
                    </span>
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
                  >
                    <option value="" disabled selected>
                      Selecione um médico
                    </option>
                    {doctors?.map((doctor) => (
                      <option
                        key={doctor.id}
                        className="hover:bg-main-bg-darker"
                        value={doctor.id}
                      >
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                  {errors.doctorId && (
                    <span className="text-red-light">
                      {errors.doctorId.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col w-full">
                  <label className="text-lg text-default-400 mb-3">
                    Data da consulta
                  </label>
                  <input
                    min="1997-01-01"
                    max="2030-12-31"
                    placeholder="Consulta"
                    className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                    type="date"
                    id="dateSchedule"
                    title="dateSchedule"
                    {...register("dateSchedule")}
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
                  />
                  {errors.timeSchedule && (
                    <span className="text-red-light">
                      {errors.timeSchedule.message}
                    </span>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Fechar
                </Button>
                <Button disabled={isLoading} type="submit" color="primary">
                  {isLoading ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </ModalFooter>
            </form>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
