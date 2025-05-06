import { Button } from "@nextui-org/react";
import { closeModal, logout } from "../../../utils/commonFunctions";
import "./modal.css";
import { useNavigate } from "react-router-dom";
import Modal from "../../../ui-library/Modal";
import { animatedIcon } from "../../../ui-library/Icons";

interface LogoutPopUpModalProps {
  modalState: (value: boolean) => void;
}

const LogoutPopUpModal: React.FC<LogoutPopUpModalProps> = ({ modalState }) => {
  const navigate = useNavigate();
  return (
    <Modal setModal={modalState} className="fadeIn">
      <div className="flex flex-col items-center gap-5 justify-center">
        <i className={animatedIcon("logout", "fade", "text-3xl")} />
        <h1 className="text-xl font-medium text-white">
          Are you sure want to{" "}
          <span className="text-red-500 font-semibold">logout</span>?
        </h1>
        <div className="flex items-center gap-5 justify-center">
          <Button color="danger" onPress={() => logout(navigate, modalState)}>
            Logout
          </Button>
          <Button
            color="warning"
            variant="bordered"
            onPress={() => closeModal(modalState)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutPopUpModal;
