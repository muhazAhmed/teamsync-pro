import React, { useEffect, useState } from "react";
import TabMenu from "../../../UI-Components/TabMenu/TabMenu";
import { Input } from "@nextui-org/react";
import { getMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
import {
  ResponseInstances,
  useSessionStorage,
} from "../../../utils/commonFunctions";

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

  return (
    <>
      {openEditModal && (
        <TabMenu
          setTabMenu={setEditModal}
          menuOptions={["Profile", "Personal Info", "Employment"]}
        >
          <div style={commonStyle}>
            <Input
              name="companyEmail"
              value={inputs.companyEmail || ""}
              label="Company Email"
              onChange={handleChange}
              variant="underlined"
            />
            <Input
              name="firstName"
              value={inputs.firstName || ""}
              label="First Name"
              onChange={handleChange}
              variant="underlined"
            />
            <Input
              name="lastName"
              value={inputs.lastName || ""}
              label="Last Name"
              onChange={handleChange}
              variant="underlined"
            />
            <Input
              name="location"
              value={inputs.location || ""}
              label="Location"
              onChange={handleChange}
              variant="underlined"
            />
            <Input
              name="phone"
              value={inputs.phone || ""}
              label="Phone"
              onChange={handleChange}
              variant="underlined"
            />
          </div>
          <div style={commonStyle}>
          <Input
              name="Date Of Birth"
              value={inputs.personalInformation?.dob || ""}
              label="Date Of Birth"
              onChange={handleChange}
              variant="underlined"
            />
          <Input
              name="nationality"
              value={inputs.personalInformation?.nationality || ""}
              label="Nationality"
              onChange={handleChange}
              variant="underlined"
            />
          <Input
              name="maritalStatus"
              value={inputs.personalInformation?.maritalStatus || ""}
              label="Marital Status"
              onChange={handleChange}
              variant="underlined"
            />
          <Input
              name="bloodGroup"
              value={inputs.personalInformation?.bloodGroup || ""}
              label="Blood Group"
              onChange={handleChange}
              variant="underlined"
            />
          <Input
              name="companyEmail"
              value={inputs.personalInformation?.dob || ""}
              label="Company Email"
              onChange={handleChange}
              variant="underlined"
            />
          <Input
              name="companyEmail"
              value={inputs.personalInformation?.dob || ""}
              label="Company Email"
              onChange={handleChange}
              variant="underlined"
            />
          <Input
              name="companyEmail"
              value={inputs.personalInformation?.dob || ""}
              label="Company Email"
              onChange={handleChange}
              variant="underlined"
            />
          <Input
              name="companyEmail"
              value={inputs.personalInformation?.dob || ""}
              label="Company Email"
              onChange={handleChange}
              variant="underlined"
            />
          </div>
          <div style={commonStyle}>For Employment Menu</div>
        </TabMenu>
      )}
    </>
  );
};

export default EditModal;
