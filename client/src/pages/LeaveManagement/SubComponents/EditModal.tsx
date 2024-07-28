import { FC, useState } from "react";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import moment, { Moment } from "moment";
import CustomInput from "../../../UI-Components/Inputs/Input";
import {
  disablePastDays,
  disableSundays,
  openModal,
  formatDate,
  CheckAccess,
} from "../../../utils/commonFunctions";
import ButtonIcon from "../../../UI-Components/Buttons/ButtonIcon";
import { Select, SelectItem } from "@nextui-org/react";
import DateRangePicker from "../../../UI-Components/DatePicker/DateRangePicker";
import toast from "react-hot-toast";
import { message } from "../../../utils/Constants";
import { patchMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";

interface ModalProps {
  setModal: any;
  userData: any;
  fetchData: any;
  setLoading: any;
}

const EditModal: FC<ModalProps> = ({
  setModal,
  userData,
  setLoading,
  fetchData,
}) => {
  const [leaveType, setLeaveType] = useState<string>("normal");
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

  const handleUpdate = async () => {
    if (CheckAccess()?.isDemoAccount) {
      toast.success(message("")?.UPDATE_SUCCESS);
      return setModal(false);
    } else {
      const payload = {
        leaveType,
        from: selectedLeaveDate?.from,
        to: selectedLeaveDate?.to,
        reason,
      };
      await patchMethodAPI(
        serverVariables?.UPDATE_LEAVE_REQUEST + userData?._id,
        payload,
        setLoading
      );
      fetchData();
      return setModal(false);
    }
  };
  return (
    <Modal
      setModal={setModal}
      className="edit-modal"
      title={`From: ${userData?.from} To: ${userData?.to}`}
    >
      <div
        className="modal-body"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.8rem",
        }}
      >
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
            style={{
              backgroundColor: "#3F3F46",
              padding: "10px",
              cursor: "pointer",
              borderRadius: "8px",
            }}
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
        <ButtonIcon
          icon="save"
          label="Update"
          color="secondary"
          action={handleUpdate}
        />
      </div>
    </Modal>
  );
};

export default EditModal;
