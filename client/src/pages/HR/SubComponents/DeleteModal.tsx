import { Button } from "@nextui-org/react";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import { FC } from "react";
import { closeModal } from "../../../utils/commonFunctions";

interface ModalProps {
  setModal: (value: boolean) => void;
  userData: any;
}
const DeleteModal: FC<ModalProps> = ({ setModal, userData }) => {
  return (
    <Modal
      setModal={setModal}
      title={userData?.firstName + " " + (userData?.lastName || "")}
    >
      <h1>Are you sure want to <span className="text-red-600">Delete</span> this request?</h1>
      <div className="modal-footer flex" style={{ justifyContent: "flex-end" }}>
        <Button color="danger">Delete</Button>
        <Button className="btn-ghost" onPress={() => closeModal(setModal)}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
