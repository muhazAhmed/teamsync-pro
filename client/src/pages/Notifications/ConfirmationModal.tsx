import { FC } from "react";
import Modal from "../../UI-Components/popUp-modal/PopUpModal";
import "./style.css";
import { Button } from "@nextui-org/react";
import { closeModal } from "../../utils/commonFunctions";

interface PopUpModalProps {
  setModal: (value: boolean) => void;
}

const ConfirmationModal: FC<PopUpModalProps> = ({ setModal }) => {
  return (
    <>
      <Modal title="Mark All as Read" setModal={setModal}>
        <h1>Are you sure want to mark all messages as read?</h1>
        <div
          className="modal-footer flex"
          style={{ justifyContent: "flex-end" }}
        >
          <Button className="btn-primary">Yes</Button>
          <Button className="btn-ghost" onClick={() => closeModal(setModal)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
