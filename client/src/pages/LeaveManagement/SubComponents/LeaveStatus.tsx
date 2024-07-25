import { FC } from "react";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import { closeModal } from "../../../utils/commonFunctions";
import "./style.css";
import { icon } from "../../../UI-Components/Icons/Icons";
import { Tooltip } from "@nextui-org/react";
import { leavePendingReq } from "../../form/Demo";

interface ModalProps {
  setModal: any;
  setLoading: any;
}

const LeaveStatus: FC<ModalProps> = ({ setModal }) => {
  return (
    <Modal
      title="Pending History"
      setModal={() => closeModal(setModal)}
      className="pending-history"
    >
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Date</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leavePendingReq?.map((item: any, index: number) => (
              <tr key={index}>
                <td style={{ paddingLeft: "5px" }}>
                  <Tooltip content="Withdraw Request" color="primary">
                    <i className={icon?.closeRounded}></i>
                  </Tooltip>
                </td>
                <td>{item?.date}</td>
                <td>{item?.leaveType}</td>
                <td>{item?.from}</td>
                <td>{item?.to}</td>
                <td>{item?.reason}</td>
                <td
                  style={
                    item?.status === "Approved"
                      ? { color: "#00ba00" }
                      : item?.status === "Rejected"
                      ? { color: "red" }
                      : { color: "yellow" }
                  }
                >
                  {item?.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default LeaveStatus;
