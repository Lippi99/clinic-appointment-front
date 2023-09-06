import { DoctorCreate } from "@/app/models/doctor";
import { createDoctor } from "@/services/doctor";
import { listEspecializations } from "@/services/especialization";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const registerDoctorSchema = z.object({
  name: z
    .string({
      required_error: "O nome deve ser informado",
    })
    .min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Informe um e-mail válido"),
  specializationId: z.string({
    required_error: "A especialidade deve ser informada",
  }),
});

export const CreateDoctor = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<DoctorCreate>({
    resolver: zodResolver(registerDoctorSchema),
  });

  const queryClient = useQueryClient();

  const { mutate: mutateCreateDoctor, isLoading } = useMutation(createDoctor, {
    onSuccess: () => {
      queryClient.invalidateQueries(["listDoctors"]);
      reset();
      onClose();
      toast.success("Médico criado com sucesso!");
    },
    onError: (error) => {
      if ((error as AxiosError).response?.status === 400) {
        toast.error("Médico já cadastrado");
      } else {
        toast.error("Houve um erro ao cadastrar o médico", {
          delay: 10,
        });
      }
    },
  });

  const { data: especializations } = useQuery({
    queryFn: listEspecializations,
    refetchOnWindowFocus: false,
  });

  const handleCreateDoctor: SubmitHandler<DoctorCreate> = (data) => {
    mutateCreateDoctor(data);
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
              Cadastrar médico
            </ModalHeader>
            <form
              onSubmit={handleSubmit(handleCreateDoctor)}
              className=" flex items-center justify-center flex-col"
            >
              <ModalBody className="w-full">
                <div className="flex flex-col w-full">
                  <label className="text-lg text-default-400 mb-3">Nome</label>
                  <input
                    placeholder="Nome"
                    className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                    type="text"
                    id="name"
                    title="Nome"
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="text-red-light">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col w-full">
                  <label className="text-lg text-default-400 mb-3">
                    E-mail
                  </label>
                  <input
                    placeholder="E-mail"
                    className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                    type="email"
                    id="email"
                    title="E-mail"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-red-light">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="w-full mb-5 flex gap-5">
                  <div className="flex flex-col w-full mb-5">
                    <label className="text-lg text-default-400 mb-3">
                      Escolha uma especialização
                    </label>
                    <select
                      id="patientId"
                      title="Id do paciente"
                      className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                      placeholder="Nome do paciente"
                      {...register("specializationId")}
                    >
                      {especializations?.map((especialization) => (
                        <option
                          value={especialization.id}
                          key={especialization.id}
                        >
                          {especialization.name}
                        </option>
                      ))}
                    </select>
                    {errors.specializationId && (
                      <span className="text-red-light">
                        {errors.specializationId.message}
                      </span>
                    )}
                  </div>
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
};
