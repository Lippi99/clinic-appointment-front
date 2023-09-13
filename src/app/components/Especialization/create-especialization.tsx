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
import { AxiosError } from "axios";
import { CreateEspecialization } from "@/app/models/especialization";
import { createEspecialization } from "@/services/especialization";
import { useTranslations } from "next-intl";

export default function CreateEspecialization() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const t = useTranslations("Index");

  const registerEspecialization = z.object({
    name: z
      .string({
        required_error: t("especializations.createEspecialization.errors.name"),
      })
      .min(3, t("especializations.createEspecialization.errors.nameShort"))
      .max(255, t("especializations.createEspecialization.errors.nameLong")),
  });

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
        {t("especializations.btnTitle")}
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
              {t("especializations.createEspecialization.title")}
            </ModalHeader>
            <form onSubmit={handleSubmit(handleRegisterAppoitment)}>
              <ModalBody>
                <div className="flex flex-col w-full mb-5">
                  <label className="text-lg text-default-400 mb-3">
                    {t("especializations.createEspecialization.name")}
                  </label>
                  <input
                    className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                    type="text"
                    id="name"
                    title="Cadastrar especialização"
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-3">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  {t("especializations.actions.cancel")}
                </Button>
                <Button disabled={isLoading} type="submit" color="primary">
                  {isLoading
                    ? t("especializations.submiting")
                    : t("especializations.submit")}
                </Button>
              </ModalFooter>
            </form>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
