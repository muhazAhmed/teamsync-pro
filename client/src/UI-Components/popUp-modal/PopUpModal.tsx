import "./modal.css";
import ReactDOM from "react-dom";
import { icon } from "../Icons/Icons";
import { closeModal } from "../../utils/commonFunctions";
import { Button, Tooltip } from "@nextui-org/react";

interface ModalProps {
  setModal: (value: boolean) => void;
  title?: string;
  header?: boolean;
  children: React.ReactNode;
  footer?: FooterItem[];
  id?: any;
  className?: string;
}

interface FooterItem {
  label: string;
  color?: "primary" | "danger";
  icon?: string;
  action: () => void;
}

const Modal: React.FC<ModalProps> = ({
  setModal,
  title,
  header = true,
  children,
  footer,
  id,
  className,
}) => {
  return ReactDOM.createPortal(
    <div className="blur-bg">
      <div
        className={`modal-container ${className ? className : ""} fadeIn`}
        id={id ? id : undefined}
      >
        {header && (
          <div className="modalHeader">
            <h1>{title}</h1>
            <Tooltip content="Close" placement="bottom" color="danger">
              <i
                className={icon.closeRounded}
                onClick={() => closeModal(setModal)}
              ></i>
            </Tooltip>
          </div>
        )}

        <div className="modal-content">{children}</div>
        {footer && (
          <div className="menu-footer">
            {footer?.map((item: FooterItem) => (
              <Button
                variant="shadow"
                className={item?.color === "primary" ? "btn-primary" : ""}
                color={item?.color}
                onClick={item.action}
                key={item.label}
              >
                {item?.icon && <i className={icon[item?.icon]}></i>}
                {item.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
