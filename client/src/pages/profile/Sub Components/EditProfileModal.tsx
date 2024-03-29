import React, { useEffect, useState } from "react";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import "./modal.css";
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { clearInputs } from "../../../utils/commonFunctions";
import {
  maritalStatus,
  physicallyChallenged,
  profileLabels,
} from "./ArrayOfInputs";
import toast from "react-hot-toast";
import { message } from "../../../utils/Constants";

interface ModalProps {
  setEditModal: (value: boolean) => void;
  title: string;
  ResponseData: { [key: string]: any } | undefined;
}

type Inputs = {
  [key: string]: any;
};

const EditProfileModal: React.FC<ModalProps> = ({
  setEditModal,
  title,
  ResponseData,
}) => {
  const [inputs, setInputs] = useState<Inputs>({});
  let CompanyEmail = ResponseData?.companyEmail;
  const labels = profileLabels(title)?.split(",") || [];

  const handleChange = (name: string, value: any) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (ResponseData) {
      const keys = Object.keys(ResponseData);
      const initialInputs: Inputs = {};
      keys.forEach((key: any) => {
        initialInputs[key] = ResponseData[key] || "";
      });
      setInputs(initialInputs);
    }
  }, [ResponseData]);

  const handleUpdate = () => {
    if (inputs?.companyEmail != CompanyEmail)
      return toast.error(message("Company Email").UNAUTHORIZED_USER);
  };

  return (
    <>
      <Modal setModal={setEditModal} title={title}>
        <div className="modal-body">
          {Object.keys(inputs).map((key) => {
            const labelIndex = Object.keys(inputs).indexOf(key);
            const label = labels[labelIndex];
            if (key === "maritalStatus") {
              return (
                <Dropdown key={key}>
                  <DropdownTrigger>
                    <Button variant="shadow" fullWidth>
                      {inputs[key] || "Marital Status"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {maritalStatus.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onClick={() => handleChange(key, option.value)}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              );
            } else if (key === "physicallyChallenged") {
              return (
                <Dropdown key={key}>
                  <DropdownTrigger>
                    <Button variant="shadow">
                      {inputs[key] || "Physically Challenged"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {physicallyChallenged.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onClick={() => handleChange(key, option.value)}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              );
            } else {
              return (
                <Input
                  key={key}
                  name={key}
                  value={inputs[key]}
                  label={label}
                  onChange={(e) => handleChange(key, e.target.value)}
                  variant="underlined"
                />
              );
            }
          })}
        </div>
        <div className="modal-footer">
          <Button className="btn-primary text-white" onClick={handleUpdate}>
            Save
          </Button>
          <Button className="btn-ghost" onClick={() => clearInputs(setInputs)}>
            Clear
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EditProfileModal;
