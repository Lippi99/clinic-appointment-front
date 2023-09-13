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
import { Doctor } from "@/app/models/doctor";
import { useTranslations } from "next-intl";

interface DoctorProps {
  doctor: Doctor;
}

export const VisualizeDoctor = ({ doctor }: DoctorProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const t = useTranslations("Index");

  return (
    <>
      <Tooltip content="Visualizar paciente">
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
                {t("doctors.visualizeDoctor.title")} {doctor.name}
              </span>
            </ModalHeader>

            <ModalBody>
              <div className="flex flex-col w-full mb-5">
                <input
                  placeholder="Nome"
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="text"
                  id="name"
                  title="name"
                  readOnly
                  defaultValue={doctor?.name}
                />
              </div>
              <div className="flex flex-col w-full mb-5">
                <input
                  placeholder="Sobrenome"
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="email"
                  id="email"
                  title="E-mail"
                  readOnly
                  defaultValue={doctor.email}
                />
              </div>
              <div className="flex flex-col w-full mb-5">
                <input
                  placeholder="Especialização"
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="text"
                  id="especialization"
                  title="especialization"
                  readOnly
                  defaultValue={doctor.specialization.name}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                {t("doctors.actions.close")}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
