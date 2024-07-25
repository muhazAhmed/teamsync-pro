import { FC, useState } from "react";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import {
  closeModal,
  disablePastDays,
  disableSundays,
  FetchRole,
  fetchUserId,
  formatDate,
  openModal,
} from "../../../utils/commonFunctions";
import Card from "../../../UI-Components/Card/Card";
import { Select, SelectItem } from "@nextui-org/react";
import DateRangePicker from "../../../UI-Components/DatePicker/DateRangePicker";
import moment, { Moment } from "moment";
import "./style.css";
import CustomInput from "../../../UI-Components/Inputs/Input";
import ButtonIcon from "../../../UI-Components/Buttons/ButtonIcon";
import { postMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";

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
    const payload = {
      leaveType,
      from: selectedLeaveDate?.from,
      to: selectedLeaveDate?.to,
      reason,
    };

    const res = await postMethodAPI(
      serverVariables?.NEW_LEAVE_REQUEST + fetchUserId + "/" + userRole,
      payload,
      setLoading
    );
    res && closeModal(setModal);
  };

  return (
    <Modal
      title="Request Time Off"
      setModal={() => closeModal(setModal)}
      className="leave-req"
    >
      <div className="leave-form">
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
        <div className="item">
          <label>Leave Date</label>
          <p
            onClick={() => openModal(setCalendar)}
            className="date-input text-sm"
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
      <div className="summary">
        <Card
          style={{ height: "100%" }}
          content={
            <div className="summary-body">
              <div className="flex flex-col gap-1" style={{ width: "100%" }}>
                <div className="summary-item">
                  <label>Leave Type:</label>
                  <p>{leaveType}</p>
                </div>
                <div className="summary-item flex-col">
                  <label>Leave Date:</label>
                  <p className="text-sm text-wrap">
                    From: {selectedLeaveDate?.from} <br /> To:{" "}
                    {selectedLeaveDate?.to}
                  </p>
                </div>
                <div className="summary-item">
                  <span>Leave Reason:</span> {reason}
                </div>
              </div>
              <div className="footer-btn">
                <ButtonIcon
                  icon="send"
                  label="Submit"
                  color="primary"
                  action={handleSubmit}
                />
                <ButtonIcon
                  icon="close"
                  label="Cancel"
                  color="danger"
                  action={() => closeModal(setModal)}
                />
              </div>
            </div>
          }
        />
      </div>
    </Modal>
  );
};

export default NewLeaveRequest;
