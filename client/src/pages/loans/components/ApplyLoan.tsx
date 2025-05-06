import { FC, useState } from "react";
import "./style.css";
import { ApplyLoanPopupProps } from "../props";
import moment from "moment";
import CustomInput from "../../../UI-Components/Inputs/Input";
import {
  CheckAccess,
  closeModal,
  fetchUserId,
  FetchUserIdAndRole,
  useToast,
} from "../../../utils/commonFunctions";
import Chip from "../../../UI-Components/Chip/Chip";
import { postMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
import { message } from "../../../utils/Constants";
import Buttons from "../../../ui-library/buttons/Button";
import Modal from "../../../ui-library/Modal";

const ApplyLoan: FC<ApplyLoanPopupProps> = ({
  setModal,
  setLoading,
  fetchLoanData,
}) => {
  const currDate = moment().format("MMM DD, YYYY");
  const [selectedAmountId, setSelectedAmountId] = useState<number>(0);
  const [inputs, setInputs] = useState<any>({
    employeeId: fetchUserId(),
    appliedOn: currDate,
    loanAmount: "",
  });

  const amounts = [
    { id: 0, label: "$100", value: "100" },
    { id: 1, label: "$500", value: "500" },
    { id: 2, label: "$1000", value: "1000" },
    { id: 3, label: "Other", value: "Other" },
  ];

  const handleAmountSelection = (amount: string, index: number) => {
    setSelectedAmountId(index);
    setInputs((prev: any) => ({ ...prev, loanAmount: Number(amount) }));
  };

  const handleSubmit = async () => {
    if (CheckAccess()?.isDemoAccount) {
      useToast(message()?.REQUEST_SUBMITTED, "success");
    } else {
      await postMethodAPI(
        serverVariables?.NEW_LOAN + FetchUserIdAndRole(),
        inputs,
        setLoading
      );
      fetchLoanData();
    }
    return setModal(false);
  };

  return (
    <Modal setModal={setModal} title="Request Loan" className="new-loan-modal">
      <div className="new-loan">
        <CustomInput
          name="employeeId"
          value={inputs?.employeeId || ""}
          setInputs={setInputs}
          label="Employee Id"
          variant="ghost"
          readOnly
        />
        <CustomInput
          name="appliedOn"
          value={inputs?.appliedOn || ""}
          setInputs={setInputs}
          label="Applied On"
          variant="ghost"
          readOnly
        />
        <div className="amount">
          <label>Loan Amount:</label>
          <div className="amount-options">
            {amounts?.map((item: any, index: number) => (
              <Chip
                label={item?.label}
                borderRadius="half"
                onClick={() => handleAmountSelection(item?.value, item?.id)}
                className={
                  selectedAmountId === index ? "btn-primary" : "btn-ghost"
                }
              />
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <span>$</span>
            <input
              type="number"
              className="w-full"
              placeholder="Enter different amount..."
              name="loanAmount"
              value={inputs?.loanAmount || 100}
              onChange={(e) => {
                setInputs((prev: any) => ({
                  ...prev,
                  loanAmount: Number(e?.target?.value),
                })),
                  setSelectedAmountId(3);
              }}
            />
          </div>
        </div>
        <div className="footer">
          <Buttons
            icon="send"
            label="Request"
            color="primary"
            onPress={() => handleSubmit()}
          />
          <Buttons
            icon="closeRounded"
            label="Cancel"
            color="danger"
            onPress={() => closeModal(setModal)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ApplyLoan;
