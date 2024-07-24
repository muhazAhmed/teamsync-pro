import { FC, useState } from "react";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import { closeModal } from "../../../utils/commonFunctions";
import Card from "../../../UI-Components/Card/Card";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import DateRangePicker from "../../../UI-Components/DatePicker/DateRangePicker";
import moment, { Moment } from "moment";
import "./style.css";
import { icon } from "../../../UI-Components/Icons/Icons";
import CustomInput from "../../../UI-Components/Inputs/Input";
import ButtonIcon from "../../../UI-Components/Buttons/ButtonIcon";

interface ModalProps {
  setModal: any;
}

const NewLeaveRequest: FC<ModalProps> = ({ setModal }) => {
  const [startDate, setStartDate] = useState<Moment>(moment().startOf("day"));
  const [endDate, setEndDate] = useState<Moment>(moment().endOf("day"));
  const [reason, setReason] = useState<string>("");
  const [calender, setCalendar] = useState<boolean>(false);

  return (
    <Modal
      title="Request Time Off"
      setModal={() => closeModal(setModal)}
      className="leave-req"
    >
      <div className="leave-form">
        <div className="item">
          <label>Leave Type:</label>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="btn-ghost"
                style={{ color: "#fff" }}
              >
                Select <i className={icon?.arrowDown}></i>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">Normal Leave</DropdownItem>
              <DropdownItem key="copy">Paid Leave</DropdownItem>
              <DropdownItem key="edit">Restricted Leave</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="item">
          <label>Leave Date</label>
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
                onApply={() => console.log("object")}
                setModal={setCalendar}
              />
            </div>
          )}
        </div>
        <div className="item flex-col" style={{ alignItems: "flex-start" }}>
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
                  <p>Normal Leave</p>
                </div>
                <div className="summary-item flex-col">
                  <label>Leave Date:</label>{" "}
                  <p>
                    {startDate.format("MMM DD, YYYY")} -{" "}
                    {endDate.format("MMM DD, YYYY")}
                  </p>
                </div>
                <div className="summary-item">
                  <span>Leave Reason:</span> {reason}
                </div>
              </div>
              <div className="footer-btn">
                <ButtonIcon icon="send" label="Submit" color="primary" />
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
