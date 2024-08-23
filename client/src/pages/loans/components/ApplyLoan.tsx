import { FC, useState } from "react";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import "./style.css";
import { ApplyLoanPopupProps } from "../props";
import moment from "moment";
import CustomInput from "../../../UI-Components/Inputs/Input";
import { fetchUserId } from "../../../utils/commonFunctions";
import Chip from "../../../UI-Components/Chip/Chip";
import ButtonIcon from "../../../UI-Components/Buttons/ButtonIcon";

const ApplyLoan: FC<ApplyLoanPopupProps> = ({ setModal }) => {
  const currDate = moment().format("MMM DD, YYYY");
  const [otherAmount, setOtherAmount] = useState<boolean>(false);
  const [inputs, setInputs] = useState<any>({
    employeeId: fetchUserId(),
    appliedOn: currDate,
    loanAmount: "",
  });

  const handleAmountSelection = (amount: string) => {
    if (amount === "Other") {
      setOtherAmount(true);
    } else {
      setOtherAmount(false);
      setInputs((prev: any) => ({ ...prev, loanAmount: Number(amount) }));
    }
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
          <label>Loan Amount</label>
          <p>Amount: ${inputs?.loanAmount}</p>
          <div className="amount-options">
            <Chip
              label="$100"
              borderRadius="half"
              onClick={() => handleAmountSelection("100")}
              variant="ghost"
            />
            <Chip
              label="$500"
              borderRadius="half"
              onClick={() => handleAmountSelection("500")}
              variant="ghost"
            />
            <Chip
              label="$1000"
              borderRadius="half"
              onClick={() => handleAmountSelection("1000")}
              variant="ghost"
            />
            <Chip
              label="Other"
              borderRadius="half"
              onClick={() => handleAmountSelection("Other")}
              variant="ghost"
            />
          </div>
          {otherAmount && (
            <div style={{ position: "relative" }}>
              <span>$</span>
              <input
                type="number"
                className="fadeIn"
                placeholder="Enter Amount..."
                name="loanAmount"
                value={inputs?.loanAmount || ""}
                onChange={(e) =>
                  setInputs((prev: any) => ({
                    ...prev,
                    loanAmount: Number(e?.target?.value),
                  }))
                }
              />
            </div>
          )}
        </div>
        <div className="footer">
          <ButtonIcon icon="send" label="Request" color="primary" />
          <ButtonIcon icon="closeRounded" label="Cancel" color="danger" />
        </div>
      </div>
    </Modal>
  );
};

export default ApplyLoan;
