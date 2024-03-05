import { Button } from "@nextui-org/react";
import { icon } from "../../../UI-Components/Icons/Icons";
import { closeModal, logout } from "../../../utils/commonFunctions";
import "./modal.css";
import { useNavigate } from "react-router-dom";

interface LogoutPopUpModalProps {
  modalState: (value: boolean) => void;
}

const LogoutPopUpModal: React.FC<LogoutPopUpModalProps> = ({ modalState }) => {
  const navigate = useNavigate();
  return (
    <div className="blur-bg">
      <div className="modalContainer w-96 fadeIn" style={{ height: "30vh" }}>
        <i className={icon.close} onClick={() => closeModal(modalState)}></i>
        <div
          className="modalBody flex flex-col items-center gap-5 justify-center"
          style={{ height: "100%" }}
        >
          <i className={icon.logout} style={{ fontSize: "2rem" }}></i>
          <h1 className="text-xl font-medium">Are you sure want to Logout?</h1>
          <div className="flex items-center gap-5 justify-center">
            <Button color="danger" onClick={() => logout(navigate, modalState)}>
              Logout
            </Button>
            <Button
              color="warning"
              variant="bordered"
              onClick={() => closeModal(modalState)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopUpModal;
