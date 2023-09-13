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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listPatient } from "@/services/patient";
import { toast } from "react-toastify";
import { listDoctors } from "@/services/doctor";
import { CreateAppointment } from "@/app/models/appointment";
import { createAppointment } from "@/services/appointment";
import ReactDatePicker from "react-datepicker";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";

export default function CreateAppointment() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const t = useTranslations("Index");

  const registerPatientSchema = z.object({
    patientId: z
      .string({
        required_error: t("appointments.createAppointment.errors.patientName"),
      })
      .nonempty(t("appointments.createAppointment.errors.patientName")),
    doctorId: z
      .string({
        required_error: t("appointments.createAppointment.errors.doctorName"),
      })

      .nonempty(t("appointments.createAppointment.errors.doctorName")),
    dateSchedule: z
      .string({
        required_error: t("appointments.createAppointment.errors.appointment"),
      })
      .nonempty(t("appointments.createAppointment.errors.appointment")),
    timeSchedule: z
      .string({
        required_error: t("appointments.createAppointment.errors.time"),
      })
      .nonempty(t("appointments.createAppointment.errors.time")),
  });

  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateAppointment>({
    resolver: zodResolver(registerPatientSchema),
  });

  const queryClient = useQueryClient();

  const { data } = useQuery({
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
        toast.success(t("appointments.createAppointment.toast.success"));
      },
      onError: (error) => {
        if ((error as AxiosError).response?.status === 409) {
          toast.error(
            t("appointments.createAppointment.toast.appointmentExists")
          );
        } else {
          toast.error(t("appointments.createAppointment.toast.appointment"), {
            delay: 10,
          });
        }
      },
    }
  );

  const handleRegisterAppoitment: SubmitHandler<CreateAppointment> = (data) => {
    mutateCreateAppointment({
      ...data,
    });
  };

  return (
    <>
      <Button
        className="bg-main-bg-darker rounded-full text-lg max-w-[20rem] w-full p-3 text-white cursor-pointer ml-5"
        onPress={onOpen}
      >
        {t("appointments.btnTitle")}
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
              {t("appointments.createAppointment.title")}
            </ModalHeader>
            <form onSubmit={handleSubmit(handleRegisterAppoitment)}>
              <ModalBody>
                <div className="flex flex-col w-full mb-5">
                  <label className="text-lg text-default-400 mb-3">
                    {t("appointments.createAppointment.patientName")}
                  </label>
                  <select
                    id="patientId"
                    title={t("appointments.createAppointment.patientName")}
                    className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                    placeholder="Nome do paciente"
                    {...register("patientId")}
                  >
                    <option value="" disabled selected>
                      {t("appointments.createAppointment.selectPatient")}
                    </option>
                    {data?.patients?.map((pacient) => (
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
                    {t("appointments.createAppointment.doctorName")}
                  </label>
                  <select
                    id="doctorId"
                    title={t("appointments.createAppointment.doctorName")}
                    className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                    placeholder={t("appointments.createAppointment.doctorName")}
                    {...register("doctorId")}
                  >
                    <option value="" disabled selected>
                      {t("appointments.createAppointment.selectDoctor")}
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
                    {t("appointments.createAppointment.appointment")}
                  </label>

                  <Controller
                    control={control}
                    name="dateSchedule"
                    render={({ field }) => (
                      <ReactDatePicker
                        className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                        placeholderText={t(
                          "appointments.createAppointment.appointment"
                        )}
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
                    {t("appointments.createAppointment.time")}
                  </label>
                  <input
                    placeholder={t("appointments.createAppointment.time")}
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
                  {t("appointments.actions.close")}
                </Button>
                <Button disabled={isLoading} type="submit" color="primary">
                  {isLoading
                    ? t("appointments.createAppointment.submit.loading")
                    : t("appointments.createAppointment.submit.text")}
                </Button>
              </ModalFooter>
            </form>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
