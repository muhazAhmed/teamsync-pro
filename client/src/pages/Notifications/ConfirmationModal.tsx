import { FC } from "react";
import "./style.css";
import { Button } from "@nextui-org/react";
import { closeModal } from "../../utils/commonFunctions";
import Modal from "../../ui-library/Modal";

interface PopUpModalProps {
  setModal: (value: boolean) => void;
}

const ConfirmationModal: FC<PopUpModalProps> = ({ setModal }) => {
  return (
    <>
      <Modal title="Mark All as Read" setModal={setModal} className="fadeIn">
        <div className="flex flex-col gap-5 mt-1">
          <h1>Are you sure want to mark all messages as read?</h1>
          <div className="flex items-center gap-2 justify-end">
            <Button className="btn-primary">Yes</Button>
            <Button className="btn-ghost" onPress={() => closeModal(setModal)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
