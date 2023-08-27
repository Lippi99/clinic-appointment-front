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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createAppointment } from "@/services/appointment";
import { AxiosError } from "axios";
import { CreateEspecialization } from "@/app/models/especialization";
import { createEspecialization } from "@/services/especialization";

const registerEspecialization = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(3, "Nome muito curto")
    .max(255, "Nome muito longo"),
});

export default function CreateEspecialization() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateEspecialization>({
    resolver: zodResolver(registerEspecialization),
  });

  const queryClient = useQueryClient();

  const { mutate: mutateCreateEspecialization, isLoading } = useMutation(
    createEspecialization,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["listEspecializations"]);
        reset();
        onClose();
        toast.success("Consulta criada com sucesso!");
      },
      onError: (error) => {
        if ((error as AxiosError).response?.status === 409) {
          toast.error("Já existe uma consulta cadastrada para este horário");
        } else {
          toast.error("Houve um erro ao cadastrar a consulta", {
            delay: 10,
          });
        }
      },
    }
  );

  const handleRegisterAppoitment: SubmitHandler<CreateEspecialization> = (
    data
  ) => {
    mutateCreateEspecialization(data);
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
              Cadastrar especialização
            </ModalHeader>
            <form onSubmit={handleSubmit(handleRegisterAppoitment)}>
              <ModalBody>
                <div className="flex flex-col w-full mb-5">
                  <label className="text-lg text-default-400 mb-3">
                    Nome da especialização
                  </label>
                  <input
                    className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                    type="text"
                    id="name"
                    title="Cadastrar especialização"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
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
