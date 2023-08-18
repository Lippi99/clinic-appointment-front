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
import { EyeIcon } from "../Icons/ViewIcon";
import { format } from "date-fns";

interface AppointmentProps {
  appointment: Appointment;
}

export const VisualizeAppointment = ({ appointment }: AppointmentProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  return (
    <>
      <Tooltip content="Visualizar consulta">
        <span
          onClick={onOpen}
          className="text-lg  text-default-400 cursor-pointer active:opacity-50"
        >
          <EyeIcon />
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
                Consulta
              </span>
            </ModalHeader>

            <ModalBody>
              <div className="flex flex-col w-full">
                <label className="text-lg text-default-400 mb-3">
                  Nome do paciente
                </label>
                <input
                  placeholder="Nome"
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="text"
                  id="name"
                  title="name"
                  readOnly
                  defaultValue={appointment.patient.name}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-lg text-default-400 mb-3">
                  Nome do médico
                </label>
                <input
                  placeholder="Nome do doutor"
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="text"
                  id="doctorName"
                  title="Nome do doutor"
                  readOnly
                  defaultValue={appointment.doctor.name}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-lg text-default-400 mb-3">
                  Data da consulta
                </label>
                <input
                  placeholder="E-mail"
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="date"
                  id="dateSchedule"
                  title="dateSchedule"
                  readOnly
                  defaultValue={format(
                    new Date(appointment?.dateSchedule as string),
                    "yyyy-MM-dd"
                  )}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                Fechar
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
