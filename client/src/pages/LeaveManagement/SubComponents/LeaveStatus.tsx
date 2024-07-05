import { FC } from "react";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal"
import { closeModal } from "../../../utils/commonFunctions"

interface ModalProps {
  setModal: any;
}

const LeaveStatus: FC<ModalProps> = ({ setModal }) => {
  return (
    <Modal title="Time-off History" setModal={() => closeModal(setModal)}>
      <div></div>
    </Modal>
  )
}

export default LeaveStatus