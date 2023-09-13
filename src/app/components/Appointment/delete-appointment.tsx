import { Appointment } from "@/app/models/appointment";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "@/services/appointment";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

interface AppointmentProps {
  appointment: Appointment;
}

export const DeleteAppointment = ({ appointment }: AppointmentProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const t = useTranslations("Index");

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["deletePatient"],
    mutationFn: () => deleteAppointment(appointment.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["listAppointments"]);
      onClose();
      toast.success(t("appointments.deleteAppointment.toast.success"));
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        toast.error(t("appointments.deleteAppointment.toast.error"));
        return;
      }
    },
  });

  return (
    <>
      <Tooltip content={t("appointments.table.tooltips.delete")}>
        <span
          onClick={onOpen}
          className="text-lg text-danger cursor-pointer active:opacity-50"
        >
          <DeleteIcon />
        </span>
      </Tooltip>

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
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                {t("appointments.deleteAppointment.title")}
              </span>
            </ModalHeader>

            <ModalBody>
              <span className="text-lg text-white cursor-pointer active:opacity-50">
                {t("appointments.deleteAppointment.message")}{" "}
                {appointment.patient.name}?
              </span>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-main-bg-darker"
                variant="flat"
                onClick={onClose}
              >
                {t("appointments.actions.cancel")}
              </Button>
              <Button
                color="danger"
                variant="flat"
                onClick={() => mutateAsync()}
              >
                {isLoading
                  ? t("appointments.deleteAppointment.deleting")
                  : t("appointments.deleteAppointment.delete")}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
