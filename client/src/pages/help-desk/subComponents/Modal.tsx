import { FC } from "react"
import Modal from "../../../UI-Components/popUp-modal/PopUpModal"

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