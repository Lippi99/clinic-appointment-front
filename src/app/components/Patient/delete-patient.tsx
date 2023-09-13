import { Patient } from "@/app/models/patient";
import { deletePatient } from "@/services/patient";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DeleteIcon } from "../Icons/DeleteIcon";
import axios, { AxiosError } from "axios";
import { useTranslations } from "next-intl";

interface PatientProps {
  patient: Patient;
}

export const DeletePatient = ({ patient }: PatientProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const t = useTranslations("Index");

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["deletePatient"],
    mutationFn: () => deletePatient(patient.id as string),
    onSuccess: () => {
      queryClient.invalidateQueries(["listPatients"]);
      onClose();
      toast.success("Paciente deletado com sucesso!");
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        toast.error("Este  paciente tem uma consulta marcada");
        return;
      }
    },
  });

  return (
    <>
      <Tooltip content={t("patients.table.tooltips.delete")}>
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
                {t("patients.deletePatient.title")}
              </span>
            </ModalHeader>

            <ModalBody>
              <span className="text-lg text-white cursor-pointer active:opacity-50">
                {t("patients.deletePatient.message")} {patient?.name}?
              </span>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-main-bg-darker"
                variant="flat"
                onClick={onClose}
              >
                {t("patients.actions.cancel")}
              </Button>
              <Button
                color="danger"
                variant="flat"
                onClick={() => mutateAsync()}
              >
                {isLoading
                  ? t("patients.deletePatient.deleting")
                  : t("patients.actions.confirm")}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
