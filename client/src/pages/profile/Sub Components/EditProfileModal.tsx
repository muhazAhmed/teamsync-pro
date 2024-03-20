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
import { maritalStatus, physicallyChallenged } from "./ArrayOfInputs";

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

  return (
    <>
      <Modal setModal={setEditModal} title={title}>
        <div className="modal-body">
          {Object.keys(inputs).map((key) => {
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
                  label={key}
                  onChange={(e) => handleChange(key, e.target.value)}
                  variant="underlined"
                />
              );
            }
          })}
        </div>
        <div className="modal-footer">
          <Button className="btn-primary text-white">Save</Button>
          <Button className="btn-ghost" onClick={() => clearInputs(setInputs)}>
            Clear
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EditProfileModal;
