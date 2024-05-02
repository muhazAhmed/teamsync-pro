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
import {
  clearInputs,
  closeModal,
  filterEmptyObj,
  useSessionStorage,
} from "../../../utils/commonFunctions";
import { dropdownKeys, getOptionsByKey, profileLabels } from "./ArrayOfInputs";
import toast from "react-hot-toast";
import { message } from "../../../utils/Constants";
import { postMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";

interface ModalProps {
  setEditModal: (value: boolean) => void;
  title: string;
  ResponseData: { [key: string]: any } | undefined;
  setLoading: (value: boolean) => void;
  userID: any;
  fetchData: any;
}

type Inputs = {
  [key: string]: any;
};

const DropdownInput: React.FC<{
  label: string;
  value: any;
  options: { label: string; value: any }[];
  onChange: (value: any) => void;
}> = ({ label, value, options, onChange }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="shadow" className="btn-ghost" fullWidth>
          {value || label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown Menu">
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

const EditProfileModal: React.FC<ModalProps> = ({
  setEditModal,
  title,
  ResponseData,
  setLoading,
  userID,
  fetchData
}) => {
  const [inputs, setInputs] = useState<Inputs>({});
  let CompanyEmail = ResponseData?.companyEmail;
  const isDemoAccount = useSessionStorage("isDemoAccount");

  const handleChange = (name: string, value: any) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (ResponseData) {
      const initialInputs: Inputs = { ...ResponseData };
      setInputs(initialInputs);
    }
  }, [ResponseData]);

  const handleUpdate = async () => {
    if (isDemoAccount) {
      toast.success("Updated Successfully");
      return closeModal(setEditModal);
    }
    if (inputs?.companyEmail !== CompanyEmail)
      return toast.error(message("Company Email").UNAUTHORIZED_USER);
    let data;
    if (title === "Personal Information") {
      data = { personalInformation: filterEmptyObj(inputs) };
    } else if (title === "Employment") {
      data = { employment: filterEmptyObj(inputs) };
    } else {
      data = filterEmptyObj(inputs);
    }
    const res = await postMethodAPI(
      `${serverVariables.UPDATE_REQUEST_USER}${userID}`,
      data,
      setLoading
    );
    if (res) {
      closeModal(setEditModal);
      fetchData();
    }
  };

  return (
    <>
      <Modal setModal={setEditModal} title={title}>
        <div className="modal-body">
          {Object.keys(inputs).map((key) => {
            const label = (profileLabels(title) as Record<string, string>)[key];
            if (!label) return null;
            if (dropdownKeys.includes(key)) {
              return (
                <DropdownInput
                  key={key}
                  label={label}
                  value={inputs[key]}
                  options={getOptionsByKey(key)}
                  onChange={(value) => handleChange(key, value)}
                />
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
