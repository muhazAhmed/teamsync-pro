import React, { useEffect, useState } from "react";
import TabMenu from "../../../UI-Components/TabMenu/TabMenu";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { getMethodAPI, patchMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
import {
  ResponseInstances,
  closeModal,
  filterEmptyObj,
  useSessionStorage,
} from "../../../utils/commonFunctions";
import CustomInput from "../../../UI-Components/Inputs/Input";
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
import { useParams } from "react-router-dom";

interface ModalProps {
  openEditModal: boolean;
  setEditModal: (value: boolean) => void;
  userDetails: any;
  setLoading: (value: boolean) => void;
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
}) => {
  const [ResponseData, setResponseData] = useState<ResponseData>({});
  const [inputs, setInputs] = useState<Inputs>({});
  const isDemoAccount = useSessionStorage("isDemoAccount");
  const { userId } = useParams();

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
      const initialInputs: Inputs = {};
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
    // const res = await patchMethodAPI(
    //   `${serverVariables.UPDATE_REQUEST_USER}${userId}`,
    //   data,
    //   setLoading
    // );
    // if (res) {
    //   closeModal(setEditModal);
    // }
  };

  const onCancelClick = () => {
    closeModal(setEditModal);
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
            <ProfileSection inputs={inputs} setInputs={setInputs} />,
            <PersonalInfoSection
              inputs={inputs}
              setInputs={setInputs}
              DropdownInput={DropdownInput}
            />,
            <EmploymentSection
              inputs={inputs}
              setInputs={setInputs}
              DropdownInput={DropdownInput}
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
  setInputs: (inputs: Inputs) => void;
}> = ({ inputs, setInputs }) => {
  return (
    <div style={commonStyle} id="Profile">
      {profileConfigs(inputs).map((inputConfig: any) => (
        <CustomInput
          key={inputConfig.name}
          type={inputConfig.type}
          name={inputConfig.name}
          value={inputs[inputConfig.name] || ""}
          label={inputConfig.label}
          setInputs={setInputs}
          variant="underline"
        />
      ))}
      <FooterButtons />
    </div>
  );
};

const PersonalInfoSection: React.FC<{
  inputs: Inputs;
  setInputs: (inputs: Inputs) => void;
  DropdownInput: React.FC<{
    label: string;
    value: any;
    options: { label: string; value: any }[];
    onChange: (value: any) => void;
  }>;
}> = ({ inputs, setInputs, DropdownInput }) => {
  return (
    <div style={commonStyle} id="Personal Info">
      {personalInfoConfigs(inputs).map((inputConfig: any) =>
        inputConfig.name === "gender" ||
        inputConfig.name === "maritalStatus" ? (
          <DropdownInput
            key={inputConfig.name}
            label={inputConfig.label}
            value={inputs[inputConfig.name] || ""}
            options={inputConfig.name === "gender" ? gender : maritalStatus}
            onChange={(value) =>
              setInputs((prev: any) => ({
                ...prev,
                [inputConfig.name]: value,
              }))
            }
          />
        ) : inputConfig.name === "physicallyChallenged" ? (
          <DropdownInput
            key={inputConfig.name}
            label={inputConfig.label}
            value={inputs[inputConfig.name] || ""}
            options={physicallyChallenged}
            onChange={(value) =>
              setInputs((prev: any) => ({
                ...prev,
                [inputConfig.name]: value,
              }))
            }
          />
        ) : (
          <CustomInput
            key={inputConfig.name}
            type={inputConfig.type}
            name={inputConfig.name}
            value={inputs[inputConfig.name] || ""}
            label={inputConfig.label}
            setInputs={setInputs}
            variant="underline"
          />
        )
      )}
      <FooterButtons />
    </div>
  );
};

const EmploymentSection: React.FC<{
  inputs: Inputs;
  setInputs: (inputs: Inputs) => void;
  DropdownInput: React.FC<{
    label: string;
    value: any;
    options: { label: string; value: any }[];
    onChange: (value: any) => void;
  }>;
}> = ({ inputs, setInputs, DropdownInput }) => {
  return (
    <div style={commonStyle} id="employment">
      {employmentConfigs(inputs).map((inputConfig: any) =>
        inputConfig.name === "status" ? (
          <DropdownInput
            key={inputConfig.name}
            label={inputConfig.label}
            value={inputs[inputConfig.name] || ""}
            options={status}
            onChange={(value) =>
              setInputs((prev: any) => ({
                ...prev,
                [inputConfig.name]: value,
              }))
            }
          />
        ) : (
          <CustomInput
            key={inputConfig.name}
            type={inputConfig.type}
            name={inputConfig.name}
            value={inputs[inputConfig.name] || ""}
            label={inputConfig.label}
            setInputs={setInputs}
            variant="underline"
          />
        )
      )}
      <FooterButtons />
    </div>
  );
};

const FooterButtons = () => {
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
      >
        Save
      </Button>
      <Button
        variant="shadow"
        className="btn-ghost"
        style={{ minWidth: "7vw" }}
      >
        Cancel
      </Button>
    </div>
  );
};
