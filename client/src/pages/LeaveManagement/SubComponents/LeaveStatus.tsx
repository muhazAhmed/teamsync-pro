import { FC, useEffect, useState } from "react";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import {
  CheckAccess,
  closeModal,
  fetchUserId,
  ResponseInstances,
} from "../../../utils/commonFunctions";
import "./style.css";
import { icon } from "../../../UI-Components/Icons/Icons";
import { Tooltip } from "@nextui-org/react";
import { leavePendingReq } from "../../form/Demo";
import { getMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

interface ModalProps {
  setModal: any;
  setLoading: any;
}

const LeaveStatus: FC<ModalProps> = ({ setModal, setLoading }) => {
  const [data, setData] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedUserData, setSelectedUserData] = useState<any>([]);

  useEffect(() => {
    if (CheckAccess()?.isDemoAccount) {
      setData(leavePendingReq);
    } else {
      fetchData();
    }
  }, []);

  const handleModal = (name: string, item: any) => {
    setSelectedUserData(item);
    name === "delete" ? setDeleteModal(true) : setEditModal(true);
  };

  const fetchData = async () => {
    const res = await getMethodAPI(
      serverVariables?.FETCH_PENDING_LEAVE_REQUEST + fetchUserId(),
      "",
      setLoading
    );
    ResponseInstances(res, 200, (responseData: any) => {
      setData(responseData);
    });
  };

  return (
    <Modal
      title="Pending History"
      setModal={() => closeModal(setModal)}
      className="pending-history"
    >
      {deleteModal && (
        <DeleteModal
          setModal={setDeleteModal}
          setLoading={setLoading}
          fetchData={fetchData}
          userData={selectedUserData}
        />
      )}
      {editModal && (
        <EditModal
          setModal={setEditModal}
          setLoading={setLoading}
          fetchData={fetchData}
          userData={selectedUserData}
        />
      )}
      {data?.length ? (
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
              {data &&
                data?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <Tooltip content="Edit" color="primary" placement="left">
                        <i
                          className={icon?.pencil}
                          onClick={() => handleModal("edit", item)}
                        ></i>
                      </Tooltip>
                      <Tooltip
                        content="Withdraw Request"
                        color="danger"
                        placement="left"
                      >
                        <i
                          className={icon?.trash}
                          onClick={() => handleModal("delete", item)}
                        ></i>
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
      ) : (
        <h5
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "1.1rem",
          }}
        >
          0 Recorders Found
        </h5>
      )}
    </Modal>
  );
};

export default LeaveStatus;
