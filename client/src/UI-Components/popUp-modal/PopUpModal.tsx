import "./modal.css";
import ReactDOM from "react-dom";
import { icon } from "../Icons/Icons";
import { closeModal } from "../../utils/commonFunctions";
import { Tooltip } from "@nextui-org/react";

interface ModalProps {
  setModal: (value: boolean) => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ setModal, title, children }) => {
  return ReactDOM.createPortal(
    <div className="blur-bg">
      <div className="modal-container fadeIn">
        <div className="modalHeader">
          <h1>{title}</h1>
          <Tooltip content="Close" placement="bottom" color="danger">
            <i
              className={icon.closeRounded}
              onClick={() => closeModal(setModal)}
            ></i>
          </Tooltip>
        </div>

        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
