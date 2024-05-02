import React, { useEffect, useState } from "react";
import TabMenu from "../../../UI-Components/TabMenu/TabMenu";
import { Input } from "@nextui-org/react";
import { getMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
import {
  ResponseInstances,
  useSessionStorage,
} from "../../../utils/commonFunctions";
import CustomInput from "../../../UI-Components/Inputs/Input";

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
    } else {
      return;
    }
  }, []);

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

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const profileConfigs = [
    { type: "text", name: "firstName", value: inputs.firstName || "", label: "First Name", },
    { type: "text", name: "lastName", value: inputs.lastName || "", label: "Last Name", },
    { type: "text", name: "location", value: inputs.location || "", label: "Location", },
    { type: "email", name: "companyEmail", value: inputs.companyEmail || "", label: "Company Email", },
    { type: "number", name: "phone", value: inputs.phone || "", label: "Phone" },
  ];

  return (
    <>
      {openEditModal && (
        <TabMenu
          setTabMenu={setEditModal}
          menuOptions={["Profile", "Personal Info", "Employment"]}
        >
          <div style={commonStyle}>
            {profileConfigs.map((inputConfig: any) => (
              <CustomInput
                key={inputConfig.name}
                type={inputConfig.type}
                name={inputConfig.name}
                value={inputs[inputConfig.name] || ""}
                label={inputConfig.label}
                setInputs={setInputs}
                variant="ghost"
              />
            ))}
          </div>
          <div style={commonStyle}>For Employment Menu</div>
        </TabMenu>
      )}
    </>
  );
};

export default EditModal;
