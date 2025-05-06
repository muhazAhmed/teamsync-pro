import { FC, MouseEvent } from "react";
import { ModalProps } from "./props";
import { closeModal } from "../utils/commonFunctions";
import { motion } from "framer-motion";
import { Tooltip } from "@nextui-org/react";
import { icon } from "./Icons";
import clsx from "clsx";
import Portal from "../components/Portal";

const Modal: FC<ModalProps> = ({ setModal, children, title, ...props }) => {
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).classList.contains("blur-bg")) {
      closeModal(setModal);
    }
  };
  return (
    <Portal>
      <div className="blur-bg" onClick={handleOutsideClick}>
        <motion.div
          {...props}
          className={clsx("modal-container", props?.className)}
        >
          {title && (
            <div className="flex items-center justify-between bg-[var(--secondary)] rounded-xl w-[100%] p-[5px]">
              <h1 className="text-sm text-white font-semibold pl-1">{title}</h1>
              <Tooltip content="Close" placement="bottom" color="danger">
                <i
                  className={`${icon.closeRounded} static text-lg`}
                  onClick={() => closeModal(setModal)}
                ></i>
              </Tooltip>
            </div>
          )}
          <div className="p-[10px] overflow-y-auto mt-1">{children}</div>
        </motion.div>
      </div>
    </Portal>
  );
};

export default Modal;
