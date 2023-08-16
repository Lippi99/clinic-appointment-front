import { Patient } from "@/app/models/patient";
import { formatDate } from "@/utils/date";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

interface PatientProps {
  patient: Patient;
}

export const VisualizePatient = ({ patient }: PatientProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <h1
        onClick={onOpen}
        className="text-lg  text-default-400 cursor-pointer active:opacity-50"
      >
        Visualizar
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
                Paciente {patient?.name}
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
                  defaultValue={patient?.name}
                />
              </div>
              <div className="flex flex-col w-full mb-5">
                <input
                  placeholder="Sobrenome"
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="text"
                  id="lastName"
                  title="Sobrenome"
                  readOnly
                  defaultValue={patient?.lastName}
                />
              </div>
              <div className="flex flex-col w-full mb-5">
                <input
                  placeholder="E-mail"
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="email"
                  id="email"
                  title="email"
                  readOnly
                  defaultValue={patient?.email}
                />
              </div>

              <div className="flex flex-col w-full mb-5">
                <input
                  placeholder="Endereço"
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="text"
                  id="address"
                  title="address"
                  readOnly
                  defaultValue={patient?.address}
                />
              </div>
              <div className="flex flex-col w-full">
                <input
                  placeholder="Data de consulta"
                  className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                  type="date"
                  id="birth"
                  readOnly
                  defaultValue={formatDate(patient?.birth, "yyyy-MM-dd")}
                  title="Data de nascimento"
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
