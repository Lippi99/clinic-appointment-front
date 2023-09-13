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
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export const CreateDoctor = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const t = useTranslations("Index");

  const registerDoctorSchema = z.object({
    name: z
      .string({
        required_error: t("doctors.createDoctor.errors.name"),
      })
      .min(3, t("doctors.createDoctor.errors.nameMin")),
    email: z.string().email(t("doctors.createDoctor.errors.email")),
    specializationId: z.string({
      required_error: t("doctors.createDoctor.errors.especialization"),
    }),
  });

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
      toast.success(t("doctors.createDoctor.toast.success"));
    },
    onError: (error) => {
      if ((error as AxiosError).response?.status === 400) {
        toast.error(t("doctors.createDoctor.toast.doctorExists"));
      } else {
        toast.error(t("doctors.createDoctor.toast.error"), {
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
        {t("doctors.btnTitle")}
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
              {t("doctors.createDoctor.title")}
            </ModalHeader>
            <form
              onSubmit={handleSubmit(handleCreateDoctor)}
              className=" flex items-center justify-center flex-col"
            >
              <ModalBody className="w-full">
                <div className="flex flex-col w-full">
                  <label className="text-lg text-default-400 mb-3">
                    {t("doctors.createDoctor.name")}
                  </label>
                  <input
                    placeholder={t("doctors.createDoctor.name")}
                    className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                    type="text"
                    id="name"
                    title={t("doctors.createDoctor.name")}
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
                    {t("doctors.createDoctor.email")}
                  </label>
                  <input
                    placeholder={t("doctors.createDoctor.email")}
                    className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                    type="email"
                    id="email"
                    title={t("doctors.createDoctor.email")}
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
                      {t("doctors.createDoctor.especialization")}
                    </label>
                    <select
                      id="patientId"
                      title="Id do paciente"
                      className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                      placeholder={t("doctors.createDoctor.patientName")}
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
              <ModalFooter className="flex justify-between w-full">
                <Button color="danger" variant="flat" onClick={onClose}>
                  {t("doctors.actions.cancel")}
                </Button>
                <Button disabled={isLoading} type="submit" color="primary">
                  {isLoading
                    ? t("doctors.createDoctor.submit.loading")
                    : t("doctors.createDoctor.submit.text")}
                </Button>
              </ModalFooter>
            </form>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
