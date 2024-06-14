import React, { FC, useEffect, useState } from "react";
import TabMenu from "../../../UI-Components/TabMenu/TabMenu";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { getMethodAPI, patchMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
import {
  ResponseInstances,
  closeModal,
  fetchUserId,
  filterEmptyObj,
  useSessionStorage,
} from "../../../utils/commonFunctions";
import {
  employmentConfigs,
  personalInfoConfigs,
  profileConfigs,
} from "./InputArrays";
import {
  gender,
  maritalStatus,
  physicallyChallenged,
  status,
} from "../../profile/Sub Components/ArrayOfInputs";
import toast from "react-hot-toast";

interface ModalProps {
  openEditModal: boolean;
  setEditModal: (value: boolean) => void;
  userDetails: any;
  setLoading: (value: boolean) => void;
  fetchAllUsers: Function;
}

interface FooterButtonProps {
  setEditModal: (value: boolean) => void;
  action?: any;
  sectionName?: string;
}

type Inputs = {
  [key: string]: any;
};
type ResponseData = {
  [key: string]: any;
};

const commonStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  columnGap: "1rem",
  rowGap: "1em",
  alignItems: "center",
};

const EditModal: React.FC<ModalProps> = ({
  openEditModal,
  setEditModal,
  userDetails,
  setLoading,
  fetchAllUsers,
}) => {
  const [ResponseData, setResponseData] = useState<ResponseData>({});
  const [inputs, setInputs] = useState<Inputs>({
    personalInformation: {},
    employment: {},
  });
  const isDemoAccount = useSessionStorage("isDemoAccount");

  const handleChange = (name: string, value: any, section?: string) => {
    if (section) {
      setInputs((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value,
        },
      }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchOneUser = async () => {
    const res = await getMethodAPI(
      `${serverVariables.FETCH_ONE_USER}${userDetails?.userId}`,
      { role: userDetails?.role },
      setLoading
    );
    ResponseInstances(res, 200, (responseData: any) => {
      setResponseData(responseData);
    });
  };

  useEffect(() => {
    if (!isDemoAccount) {
      fetchOneUser();
    }
  }, [isDemoAccount]);

  useEffect(() => {
    if (ResponseData) {
      const initialInputs: Inputs = {
        personalInformation: {},
        employment: {},
      };
      Object.keys(ResponseData).forEach((key: any) => {
        initialInputs[key] = ResponseData[key] || "";
      });
      setInputs(initialInputs);
    }
  }, [ResponseData]);

  const handleUpdate = async () => {
    if (isDemoAccount) {
      toast.success("Updated Successfully");
      closeModal(setEditModal);
      return;
    }
    const data = filterEmptyObj(inputs);
    const res = await patchMethodAPI(
      `${serverVariables.UPDATE_USER}${fetchUserId}?role=${userDetails?.role}`,
      data,
      setLoading
    );
    if (res) {
      closeModal(setEditModal);
      fetchAllUsers();
    }
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
          <Button
            variant="shadow"
            className="btn-ghost"
            fullWidth
            style={{ color: "black" }}
            title={label}
          >
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

  return (
    <>
      {openEditModal && (
        <TabMenu
          setTabMenu={setEditModal}
          menuOptions={["Profile", "Personal Info", "Employment"]}
          menuItems={[
            <ProfileSection
              inputs={inputs}
              handleChange={handleChange}
              setEditModal={setEditModal}
              action={handleUpdate}
            />,
            <PersonalInfoSection
              inputs={inputs}
              DropdownInput={DropdownInput}
              handleChange={handleChange}
              setEditModal={setEditModal}
              action={handleUpdate}
            />,
            <EmploymentSection
              inputs={inputs}
              DropdownInput={DropdownInput}
              handleChange={handleChange}
              setEditModal={setEditModal}
              action={handleUpdate}
            />,
          ]}
        ></TabMenu>
      )}
    </>
  );
};

export default EditModal;

const ProfileSection: React.FC<{
  inputs: Inputs;
  handleChange: Function;
  setEditModal: any;
  action: Function;
}> = ({ inputs, handleChange, setEditModal, action }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={commonStyle} id="Profile">
        {profileConfigs(inputs).map((inputConfig: any) => (
          <Input
            key={inputConfig?.name}
            type={inputConfig.type}
            name={inputConfig.name}
            value={inputs[inputConfig.name] || ""}
            label={inputConfig.label}
            onChange={(e) => handleChange(inputConfig.name, e.target.value)}
            variant="underlined"
          />
        ))}
      </div>
      <FooterButtons
        setEditModal={setEditModal}
        action={action}
        sectionName={"profile"}
      />
    </div>
  );
};

const PersonalInfoSection: React.FC<{
  inputs: Inputs;
  handleChange: Function;
  setEditModal: any;
  action: Function;
  DropdownInput: React.FC<{
    label: string;
    value: any;
    options: { label: string; value: any }[];
    onChange: (value: any) => void;
  }>;
}> = ({ inputs, DropdownInput, handleChange, setEditModal, action }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={commonStyle} id="Personal Info">
        {personalInfoConfigs(inputs).map((inputConfig: any) =>
          inputConfig.name === "gender" ||
          inputConfig.name === "maritalStatus" ? (
            <DropdownInput
              key={inputConfig.name}
              label={inputConfig.label}
              value={inputs.personalInformation[inputConfig.name] || ""}
              options={inputConfig.name === "gender" ? gender : maritalStatus}
              onChange={(value) =>
                handleChange(inputConfig.name, value, "personalInformation")
              }
            />
          ) : inputConfig.name === "physicallyChallenged" ? (
            <DropdownInput
              key={inputConfig.name}
              label={inputConfig.label}
              value={inputs.personalInformation[inputConfig.name] || ""}
              options={physicallyChallenged}
              onChange={(value) =>
                handleChange(
                  inputConfig.name,
                  value === "true" ? true : false,
                  "personalInformation"
                )
              }
            />
          ) : (
            <Input
              key={inputConfig.name}
              type={inputConfig.type}
              name={inputConfig.name}
              value={inputs.personalInformation[inputConfig.name] || ""}
              label={inputConfig.label}
              onChange={(e) =>
                handleChange(
                  inputConfig.name,
                  e.target.value,
                  "personalInformation"
                )
              }
              variant="underlined"
            />
          )
        )}
      </div>
      <FooterButtons
        setEditModal={setEditModal}
        action={action}
        sectionName={"personalInfo"}
      />
    </div>
  );
};

const EmploymentSection: React.FC<{
  inputs: Inputs;
  handleChange: Function;
  action: Function;
  setEditModal: any;
  DropdownInput: React.FC<{
    label: string;
    value: any;
    options: { label: string; value: any }[];
    onChange: (value: any) => void;
  }>;
}> = ({ inputs, DropdownInput, handleChange, setEditModal, action }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={commonStyle} id="employment">
        {employmentConfigs(inputs).map((inputConfig: any) =>
          inputConfig.name === "status" ? (
            <DropdownInput
              key={inputConfig.name}
              label={inputConfig.label}
              value={inputs.employment[inputConfig.name] || ""}
              options={status}
              onChange={(value) =>
                handleChange(inputConfig.name, value, "employment")
              }
            />
          ) : (
            <Input
              key={inputConfig.name}
              type={inputConfig.type}
              name={inputConfig.name}
              value={inputs.employment[inputConfig.name] || ""}
              label={inputConfig.label}
              onChange={(e) =>
                handleChange(inputConfig.name, e.target.value, "employment")
              }
              variant="underlined"
            />
          )
        )}
      </div>
      <FooterButtons
        setEditModal={setEditModal}
        action={action}
        sectionName={"employment"}
      />
    </div>
  );
};

const FooterButtons: FC<FooterButtonProps> = ({
  action,
  setEditModal,
  sectionName,
}) => {
  const onCancelClick = () => {
    closeModal(setEditModal);
  };
  return (
    <div
      className="menu-footer"
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        gap: "0.5rem",
        minHeight: "10vh",
      }}
    >
      <Button
        variant="shadow"
        className="btn-primary"
        style={{ minWidth: "7vw" }}
        onClick={() => action(sectionName)}
      >
        Update
      </Button>
      <Button
        variant="shadow"
        className="btn-ghost"
        style={{ minWidth: "7vw" }}
        onClick={onCancelClick}
      >
        Cancel
      </Button>
    </div>
  );
};
