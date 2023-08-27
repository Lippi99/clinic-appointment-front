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
import { Especialization } from "@/app/models/especialization";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEspecialization } from "@/services/especialization";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

interface EspecializationProps {
  especialization: Especialization;
}

export const DeleteEspecialization = ({
  especialization,
}: EspecializationProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["deletePatient"],
    mutationFn: () => deleteEspecialization(especialization.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["listEspecializations"]);
      onClose();
      toast.success("Especialização deletada com sucesso!");
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        toast.error("Erro ao deletar a especialização");
        return;
      }
    },
  });

  return (
    <>
      <Tooltip content="Deletar especialização">
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
                Deletar especialização
              </span>
            </ModalHeader>

            <ModalBody>
              <span className="text-lg text-white cursor-pointer active:opacity-50">
                Deseja deletar a especialização {especialization.name}?
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
                onClick={() => mutateAsync()}
                color="danger"
                variant="flat"
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
