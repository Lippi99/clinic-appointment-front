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

interface AppointmentProps {
  appointment: Appointment;
}

export const DeleteAppointment = ({ appointment }: AppointmentProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["deletePatient"],
    mutationFn: () => deleteAppointment(appointment.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["listAppointments"]);
      onClose();
      toast.success("Consulta deletada com sucesso!");
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        toast.error("Erro ao deletar a consulta");
        return;
      }
    },
  });

  return (
    <>
      <Tooltip content="Deletar consulta">
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
                Deletar consulta
              </span>
            </ModalHeader>

            <ModalBody>
              <span className="text-lg text-white cursor-pointer active:opacity-50">
                Deseja deletar a consulta do paciente {appointment.patient.name}
                ?
              </span>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-main-bg-darker"
                variant="flat"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                color="danger"
                variant="flat"
                onClick={() => mutateAsync()}
              >
                {isLoading ? "Deletando..." : "Confirmar"}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
