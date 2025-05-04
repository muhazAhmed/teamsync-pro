import { useEffect, useState } from "react";
import Card from "../../UI-Components/Card/Card";
import Pagination from "../../UI-Components/Pagination/Pagination";
import { holidayList, leaveData } from "./ArrayOfItems";
import "./style.css";
import usePagination from "../../utils/custom-hooks/usePagination";
import Loader from "../../UI-Components/Loader/Loader";
import NewLeaveRequest from "./SubComponents/NewLeaveRequest";
import LeaveStatus from "./SubComponents/LeaveStatus";
import { openModal, usePageName } from "../../utils/commonFunctions";
import Buttons from "../../ui-library/buttons/Button";

const LeaveManagement = () => {
  const [itemsPerPage] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const [newReqModal, setNewReqModal] = useState<boolean>(false);
  const [leaveStatusModal, setLeaveStatusModal] = useState<boolean>(false);

  useEffect(() => {
    usePageName("Leave Management");
  }, []);

  const { currentData, currentPage, totalPages, nextPage, prevPage, goToPage } =
    usePagination({ data: leaveData, itemsPerPage });

  return (
    <div className="time-off">
      {loading && <Loader />}
      {newReqModal && (
        <NewLeaveRequest setModal={setNewReqModal} setLoading={setLoading} />
      )}
      {leaveStatusModal && (
        <LeaveStatus setModal={setLeaveStatusModal} setLoading={setLoading} />
      )}
      <div className="header-btn">
        <Buttons
          label="Request Leave"
          className="btn-primary"
          iconPosition="left"
          icon="vacation"
          onPress={() => openModal(setNewReqModal)}
        />
        <Buttons
          label="Pending"
          className="btn-ghost"
          iconPosition="left"
          icon="clock"
          onPress={() => openModal(setLeaveStatusModal)}
        />
      </div>
      <div className="container">
        <div className="stats">
          <Card
            id="chips"
            content={
              <div className="body">
                <h1>Leave Balance</h1>
                <div className="items-container">
                  <div className="item">
                    <h2>
                      <span>08</span>/12
                    </h2>
                    <h4>Casual Leave</h4>
                  </div>
                  <div className="item">
                    <h2>
                      <span>12</span>/21
                    </h2>
                    <h4>Paid Leave</h4>
                  </div>
                  <div className="item">
                    <h2>
                      <span>02</span>/02
                    </h2>
                    <h4>Restricted Leave</h4>
                  </div>
                </div>
              </div>
            }
          />
          <Card
            className="table-wrapper"
            content={
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Leave Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.map((item: any, index: number) => (
                      <tr key={index}>
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
                {leaveData.length > itemsPerPage && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goToPage={goToPage}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    style={{ position: "absolute", bottom: "-170px" }}
                  />
                )}
              </div>
            }
          />
        </div>
        <div className="end-content">
          <Card
            id="holidays"
            content={
              <div className="body">
                <h1>Public Holidays</h1>
                <div
                  className="items-container"
                  style={{ flexDirection: "column" }}
                >
                  {holidayList.map((item: any, index: number) => (
                    <div
                      className="item"
                      key={index}
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        borderRadius: "5px",
                      }}
                    >
                      <h2>{item?.label}</h2>
                      <h4>{item?.value}</h4>
                    </div>
                  ))}

                  <h5>See All</h5>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
