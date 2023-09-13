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
import { useTranslations } from "next-intl";

export default function CreatePatient() {
  const t = useTranslations("Index");
  const registerPatientSchema = z.object({
    name: z.string().min(3, t("patients.createPatient.errors.name")),
    lastName: z.string().min(3, t("patients.createPatient.errors.lastName")),
    birth: z
      .string({
        required_error: t("patients.createPatient.errors.birth"),
      })
      .refine(
        (data) => {
          const currentDate = new Date();
          return new Date(data) < currentDate;
        },
        {
          message: t("patients.createPatient.errors.birthInvalid"),
        }
      ),
    region: z
      .string({
        required_error: t("patients.createPatient.errors.region"),
      })
      .min(3, t("patients.createPatient.errors.region")),
    address: z.string().min(3, t("patients.createPatient.errors.address")),
    email: z.string().email(t("patients.createPatient.errors.email")),
  });

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
        toast.success(t("patients.createPatient.toast.success"));
      },
      onError: () => {
        toast.error("patients.createPatient.toast.error", {
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
        {t("patients.btnTitle")}
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
              {t("patients.createPatient.title")}
            </ModalHeader>
            <form onSubmit={handleSubmit(handleRegisterPatient)}>
              <ModalBody>
                <div className="flex gap-3">
                  <div className="flex flex-col w-full mb-5">
                    <label className="text-lg text-default-400 mb-3">
                      {t("patients.createPatient.name")}
                    </label>
                    <input
                      placeholder={t("patients.createPatient.name")}
                      className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                      type="text"
                      id="name"
                      title={t("patients.createPatient.name")}
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
                      {t("patients.createPatient.lastName")}
                    </label>
                    <input
                      placeholder={t("patients.createPatient.lastName")}
                      className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                      type="text"
                      id="lastName"
                      title={t("patients.createPatient.lastName")}
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
                    {t("patients.createPatient.email")}
                  </label>
                  <input
                    placeholder="E-mail"
                    className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                    type="email"
                    id="email"
                    title={t("patients.createPatient.email")}
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
                      {t("patients.createPatient.address")}
                    </label>
                    <input
                      placeholder={t("patients.createPatient.address")}
                      className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                      type="text"
                      id="address"
                      title={t("patients.createPatient.address")}
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
                      {t("patients.createPatient.regionLabel")}
                    </label>
                    <input
                      placeholder={t("patients.createPatient.region")}
                      className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                      type="text"
                      id="region"
                      title={t("patients.createPatient.region")}
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
                    {t("patients.createPatient.birth")}
                  </label>
                  <Controller
                    control={control}
                    name="birth"
                    render={({ field }) => (
                      <ReactDatePicker
                        className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                        placeholderText={t("patients.createPatient.birth")}
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
                  {t("patients.createPatient.close")}
                </Button>
                <Button disabled={isLoading} type="submit" color="primary">
                  {isLoading
                    ? t("patients.createPatient.submit.loading")
                    : t("patients.createPatient.submit.text")}
                </Button>
              </ModalFooter>
            </form>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
