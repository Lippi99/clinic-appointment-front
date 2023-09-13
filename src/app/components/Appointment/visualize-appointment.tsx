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
import { useTranslations } from "next-intl";

interface AppointmentProps {
  appointment: Appointment;
}

export const VisualizeAppointment = ({ appointment }: AppointmentProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const t = useTranslations("Index");

  return (
    <>
      <Tooltip content={t("appointments.table.tooltips.visualize")}>
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
                {t("appointments.visualizeAppointment.title")}
              </span>
            </ModalHeader>

            <ModalBody>
              <div className="flex flex-col w-full">
                <label className="text-lg text-default-400 mb-3">
                  {t("appointments.createAppointment.patientName")}
                </label>
                <input
                  placeholder={t("appointments.createAppointment.patientName")}
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
                  {t("appointments.createAppointment.doctorName")}
                </label>
                <input
                  placeholder={t("appointments.createAppointment.doctorName")}
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="text"
                  id="doctorName"
                  title={t("appointments.createAppointment.doctorName")}
                  readOnly
                  defaultValue={appointment.doctor.name}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-lg text-default-400 mb-3">
                  {t("appointments.createAppointment.appointment")}
                </label>

                <input
                  placeholder="DD/MM/YYYY"
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="text"
                  id="dateSchedule"
                  title="dateSchedule"
                  readOnly
                  defaultValue={format(
                    new Date(appointment?.dateSchedule),
                    "dd/MM/yyyy"
                  )}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-lg text-default-400 mb-3">
                  {t("appointments.createAppointment.time")}
                </label>

                <input
                  placeholder={t("appointments.createAppointment.time")}
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="text"
                  id="timeSchedule"
                  title={t("appointments.createAppointment.time")}
                  readOnly
                  defaultValue={appointment.timeSchedule}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                {t("appointments.actions.close")}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
