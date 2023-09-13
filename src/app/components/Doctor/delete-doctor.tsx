import { Doctor } from "@/app/models/doctor";
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
import { deleteDoctor } from "@/services/doctor";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useTranslations } from "next-intl";

interface DeleteDoctorProps {
  doctor: Doctor;
}
export const DeleteDoctor = ({ doctor }: DeleteDoctorProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();
  const t = useTranslations("Index");

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["deleteDoctor"],
    mutationFn: () => deleteDoctor(doctor.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["listDoctors"]);
      onClose();
      toast.success(t("doctors.deleteDoctor.toast.success"));
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        toast.error(t("doctors.deleteDoctor.toast.error"));
        return;
      }
    },
  });

  return (
    <>
      <Tooltip content="Deletar Médico">
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
                {t("doctors.deleteDoctor.title")}
              </span>
            </ModalHeader>

            <ModalBody>
              <span className="text-lg text-white cursor-pointer active:opacity-50">
                {t("doctors.deleteDoctor.message")} {doctor.name} ?
              </span>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-main-bg-darker"
                variant="flat"
                onClick={onClose}
              >
                {t("doctors.actions.cancel")}
              </Button>
              <Button
                color="danger"
                variant="flat"
                onClick={() => mutateAsync()}
              >
                {isLoading
                  ? t("doctors.deleteDoctor.deleting")
                  : t("doctors.deleteDoctor.delete")}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
