import { FC, useState } from "react";
import moment from "moment";
import {
  CheckAccess,
  fetchUserId,
  useToast,
} from "../../../utils/commonFunctions";
import { postMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
import Buttons from "../../../ui-library/buttons/Button";
import Modal from "../../../ui-library/Modal";

interface BugsProp {
  setModal: any;
  bug: string;
  resetErrorBoundary: any;
  setLoading: any;
}
const ReportBug: FC<BugsProp> = ({
  bug,
  setModal,
  setLoading,
  resetErrorBoundary,
}) => {
  const currDate = moment().format("DD-MM-YYYY HH:mm");
  const url = window.location.href;
  const [inputs, setInputs] = useState<any>({
    date: currDate,
    userID: fetchUserId(),
    bug: bug,
    pageURL: url,
    message: "",
  });

  const handleSubmit = async () => {
    if (CheckAccess()?.isDemoAccount) {
      return useToast("Thank you for reporting", "success");
    } else {
      await postMethodAPI(serverVariables?.NEW_BUG, inputs, setLoading);
    }
    setModal(false);
    resetErrorBoundary();
  };

  return (
    <Modal setModal={setModal}>
      <div className="w-full flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">Report Bug</h1>
        <input
          name="date"
          className="bg-transparent border-2 border-blue-400 p-2 rounded-full w-full text-gray-400"
          value={`Date: ${currDate}`}
          readOnly
        />
        <input
          name="userID"
          className="bg-transparent border-2 border-blue-400 p-2 rounded-full w-full text-gray-400"
          value={`User ID: ${fetchUserId()}`}
          readOnly
        />
        <textarea
          name="message"
          value={inputs?.message || ""}
          placeholder="Enter your message here (optional)"
          className="bg-transparent border-2 border-blue-400 p-2 h-32 rounded-2xl w-full"
          onChange={(e: any) =>
            setInputs({
              ...inputs,
              [e.target.name]: e.target.value,
            })
          }
        />
        <Buttons
          icon="send"
          label="Submit"
          className="btn-primary w-full"
          onPress={() => handleSubmit()}
        />
      </div>
    </Modal>
  );
};

export default ReportBug;
