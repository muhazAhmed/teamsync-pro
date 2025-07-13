import { FC, useState } from "react";
import {
  CheckAccess,
  closeModal,
  disablePastDays,
  disableSundays,
  FetchRole,
  fetchUserId,
  formatDate,
  openModal,
} from "../../../utils/commonFunctions";
import Card from "../../../ui-library/Card";
import { Select, SelectItem } from "@nextui-org/react";
import DateRangePicker from "../../../UI-Components/DatePicker/DateRangePicker";
import moment, { Moment } from "moment";
import "./style.css";
import CustomInput from "../../../ui-library/inputs/Input";
import { postMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
import toast from "react-hot-toast";
import Buttons from "../../../ui-library/buttons/Button";
import Modal from "../../../ui-library/Modal";

interface ModalProps {
  setModal: any;
  setLoading: any;
}

const NewLeaveRequest: FC<ModalProps> = ({ setModal, setLoading }) => {
  const [leaveType, setLeaveType] = useState<string>("normal");
  const userRole = FetchRole();
  const [startDate, setStartDate] = useState<Moment>(moment().startOf("day"));
  const [endDate, setEndDate] = useState<Moment>(moment().endOf("day"));
  const [reason, setReason] = useState<string>("");
  const [calender, setCalendar] = useState<boolean>(false);
  const [selectedLeaveDate, setSelectedLeaveDate] = useState<any>({
    from: moment().format("DD-MM-YYYY"), // default
    to: moment().format("DD-MM-YYYY"), // default
  });

  const handleApply = (startDate: Moment | null, endDate: Moment | null) => {
    const from = formatDate(startDate);
    const to = formatDate(endDate);
    setSelectedLeaveDate({ from: from, to: to });
  };

  const disableDates = (date: Moment) => {
    return disablePastDays(date) || disableSundays(date);
  };

  const handleSubmit = async () => {
    console.log(CheckAccess()?.isDemoAccount);
    if (CheckAccess()?.isDemoAccount) {
      toast.success("Request submitted successfully");
      return closeModal(setModal);
    } else {
      const payload = {
        leaveType,
        from: selectedLeaveDate?.from,
        to: selectedLeaveDate?.to,
        reason,
      };

      const res = await postMethodAPI(
        serverVariables?.NEW_LEAVE_REQUEST + fetchUserId() + "/" + userRole,
        payload,
        setLoading
      );
      res && closeModal(setModal);
    }
  };

  return (
    <Modal title="Request Time Off" setModal={() => closeModal(setModal)}>
      <div className="leave-req flex items-center justify-between w-[40vw] h-[50vh]">
        <div className="leave-form flex flex-col items-start justify-between p-5 h-full w-full">
          <Select
            label="Select Leave Type"
            className="dropdown"
            variant="bordered"
            onChange={(e) => setLeaveType(e?.target?.value)}
          >
            <SelectItem key="normal">Normal Leave</SelectItem>
            <SelectItem key="paid">Paid Leave</SelectItem>
            <SelectItem key="restricted">Restricted Leave</SelectItem>
          </Select>
          <div className="item flex items-start gap-2 flex-col text-[15px]">
            <label className="text-gray-300">Leave Date</label>
            <p
              onClick={() => openModal(setCalendar)}
              className="date-input text-sm bg-[#484848] p-5 rounded-xl cursor-pointer"
            >
              {selectedLeaveDate?.from} - {selectedLeaveDate?.to}
            </p>
            {calender && (
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "15px",
                  zIndex: "10",
                }}
              >
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  onApply={handleApply}
                  setModal={setCalendar}
                  disabledDates={disableDates}
                />
              </div>
            )}
          </div>
          <div className="item">
            <label>
              Leave Reason: <span className="text-slate-500">(optional)</span>
            </label>
            <CustomInput
              name="reason"
              value={reason || ""}
              setInputs={setReason}
              type="text"
              placeholder="Enter leave reason"
              id="reason"
            />
          </div>
        </div>
        <div className="w-full h-full">
          <Card className="h-full">
            <div className="summary-body flex flex-col items-center justify-between h-full text-[#b3b3b3]">
              <div className="flex flex-col w-full">
                <div className="summary-item flex items-start gap-2 w-full p-2">
                  <label>Leave Type:</label>
                  <p>{leaveType}</p>
                </div>
                <div className="summary-item flex flex-col items-start gap-2 w-full p-1">
                  <label>Leave Date:</label>
                  <p className="text-sm text-wrap">
                    From: {selectedLeaveDate?.from} <br /> To:{" "}
                    {selectedLeaveDate?.to}
                  </p>
                </div>
                <div className="summary-item flex items-start gap-2 w-full p-2">
                  <span>Leave Reason:</span> {reason}
                </div>
              </div>
              <div className="footer-btn flex items-center w-full justify-evenly">
                <Buttons
                  icon="send"
                  label="Submit"
                  color="primary"
                  onPress={handleSubmit}
                />
                <Buttons
                  icon="close"
                  label="Cancel"
                  color="danger"
                  onPress={() => closeModal(setModal)}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Modal>
  );
};

export default NewLeaveRequest;
