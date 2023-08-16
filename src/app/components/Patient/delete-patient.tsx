import { Patient } from "@/app/models/patient";
import { deletePatient } from "@/services/patient";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface PatientProps {
  patient: Patient;
}

export const DeletePatient = ({ patient }: PatientProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["deletePatient"],
    mutationFn: () => deletePatient(patient.id as string),
    onSuccess: () => {
      queryClient.invalidateQueries(["listPatients"]);
      onClose();
      toast.success("Paciente deletado com sucesso!");
    },
  });

  return (
    <>
      <h1
        onClick={onOpen}
        className="text-lg  text-default-400 cursor-pointer active:opacity-50"
      >
        Deletar
      </h1>

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
                Deletar paciente
              </span>
            </ModalHeader>

            <ModalBody>
              <span className="text-lg text-white cursor-pointer active:opacity-50">
                Deseja deletar o paciente {patient?.name}?
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
