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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpValidationSchema } from "@/app/models/patient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "@/services/patient";
import { toast } from "react-toastify";
import ReactDatePicker from "react-datepicker";

const registerPatientSchema = z.object({
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
  region: z
    .string({
      required_error: "A região deve ser informada",
    })
    .min(3, "A região deve ser informada"),
  address: z.string().min(3, "O endereço deve ser informado"),
  email: z.string().email("Informe seu e-mail"),
});

export default function CreatePatient() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpValidationSchema>({
    resolver: zodResolver(registerPatientSchema),
  });

  const queryClient = useQueryClient();

  const { mutate: mutateCreatePatient, isLoading } = useMutation(
    createPatient,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["listPatients"]);
        reset();
        onClose();
        toast.success("Paciente criado com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao cadastrar paciente", {
          delay: 10,
        });
      },
    }
  );

  const handleRegisterPatient: SubmitHandler<SignUpValidationSchema> = (
    data
  ) => {
    mutateCreatePatient(data);
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
              Cadastrar paciente
            </ModalHeader>
            <form onSubmit={handleSubmit(handleRegisterPatient)}>
              <ModalBody>
                <div className="flex gap-3">
                  <div className="flex flex-col w-full mb-5">
                    <label className="text-lg text-default-400 mb-3">
                      Nome do paciente
                    </label>
                    <input
                      placeholder="Nome"
                      className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                      type="text"
                      id="name"
                      title="name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="text-red-light">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col w-full mb-5">
                    <label className="text-lg text-default-400 mb-3">
                      Sobrenome do paciente
                    </label>
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
                <div className="flex flex-col w-full mb-5">
                  <label className="text-lg text-default-400 mb-3">
                    E-mail do paciente
                  </label>
                  <input
                    placeholder="E-mail"
                    className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                    type="email"
                    id="email"
                    title="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-red-light">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col w-full mb-5">
                    <label className="text-lg text-default-400 mb-3">
                      Endereço do paciente
                    </label>
                    <input
                      placeholder="Endereço"
                      className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                      type="text"
                      id="address"
                      title="address"
                      {...register("address")}
                    />
                    {errors.address && (
                      <span className="text-red-light">
                        {errors.address.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col w-full mb-5">
                    <label className="text-lg text-default-400 mb-3">
                      Região do paciente
                    </label>
                    <input
                      placeholder="Teresópolis / RJ"
                      className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                      type="text"
                      id="region"
                      title="region"
                      {...register("region")}
                    />
                    {errors.region && (
                      <span className="text-red-light">
                        {errors.region.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-lg text-default-400 mb-3">
                    Data de nascimento do paciente
                  </label>
                  <Controller
                    control={control}
                    name="birth"
                    render={({ field }) => (
                      <ReactDatePicker
                        className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                        placeholderText="Data de nascimento"
                        onChange={(date) => field.onChange(date?.toISOString())}
                        selected={field.value ? new Date(field.value) : null}
                        dateFormat="dd/MM/yyyy"
                        id="birth"
                      />
                    )}
                  />
                  {errors.birth && (
                    <span className="text-red-light">
                      {errors.birth.message}
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
