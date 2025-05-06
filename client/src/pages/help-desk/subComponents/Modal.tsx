import { FC } from "react"
import Modal from "../../../ui-library/Modal";

interface ModalProps {
    setModal: any;
    children: any;
    title: any;
}

const PopupModal: FC <ModalProps> = ({setModal, children, title}) => {
  return (
    <Modal title={title} setModal={setModal}>
        {children}
    </Modal>
  )
}

export default PopupModal