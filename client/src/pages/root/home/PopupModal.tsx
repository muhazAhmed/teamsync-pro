import React from "react";
import { Button } from "@nextui-org/react";
import { newSessionStorage, AssignRole } from "../../../utils/commonFunctions";
import { empDemoData, hrDemoData } from "../../form/Demo";
import Modal from "../../../ui-library/Modal";

interface ModalProps {
  setModal: (value: boolean) => void;
  navigate: any;
}

const PopupModal: React.FC<ModalProps> = ({ setModal, navigate }) => {
  const SuccessResponse = (result: any, res: string, role: string) => {
    newSessionStorage("userInfo", result);
    newSessionStorage("client-id", AssignRole(role));
    newSessionStorage("userTokenID", res);
    newSessionStorage("isDemoAccount", true);
    navigate(`/dashboard/${result?._id}`);
  };

  return (
    <Modal setModal={setModal} title={"Choose Login As"}>
      <div className="flex items-center justify-center gap-4 p-5">
        <Button
          className="btn-primary text-white"
          onPress={() => SuccessResponse(hrDemoData, "demo token", "HR")}
        >
          HR
        </Button>
        <Button
          className="btn-ghost"
          onPress={() => SuccessResponse(empDemoData, "demo token", "Employee")}
        >
          Employee
        </Button>
      </div>
    </Modal>
  );
};

export default PopupModal;
