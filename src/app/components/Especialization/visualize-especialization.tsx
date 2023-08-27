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
import ReactDatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import { Especialization } from "@/app/models/especialization";

interface EspecializationProps {
  especialization: Especialization;
}

export const VisualizeEspecialization = ({
  especialization,
}: EspecializationProps) => {
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
                Especialização
              </span>
            </ModalHeader>

            <ModalBody>
              <div className="flex flex-col w-full">
                <label className="text-lg text-default-400 mb-3">
                  Nome da especialização
                </label>
                <input
                  placeholder="Nome"
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="text"
                  id="name"
                  title="name"
                  readOnly
                  defaultValue={especialization.name}
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
