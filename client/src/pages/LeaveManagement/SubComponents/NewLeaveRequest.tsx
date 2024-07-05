import { FC } from "react";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import { closeModal } from "../../../utils/commonFunctions";

interface ModalProps {
  setModal: any;
}

const NewLeaveRequest: FC<ModalProps> = ({ setModal }) => {
  return (
    <Modal title="Request Time Off" setModal={() => closeModal(setModal)}>
      <div></div>
    </Modal>
  );
};

export default NewLeaveRequest;
