import { lazy, useEffect, useState } from "react";
import Card from "../../ui-library/Card";
import Pagination from "../../UI-Components/Pagination/Pagination";
import { holidayList, leaveData } from "./ArrayOfItems";
import "./style.css";
import usePagination from "../../utils/custom-hooks/usePagination";
import Loader from "../../ui-library/Loader/Loader";
const NewLeaveRequest = lazy(() => import("./SubComponents/NewLeaveRequest"));
const LeaveStatus = lazy(() => import("./SubComponents/LeaveStatus"));
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
          <Card className="h-full">
            <div className="flex flex-col items-start gap-5">
              <h1>Leave Balance</h1>
              <div className="flex items-center justify-between w-full gap-5">
                <div className="item">
                  <h2 className="text-[17px]">
                    <span className="text-[30px] text-[var(--primary)]">
                      08
                    </span>
                    /12
                  </h2>
                  <h4 className="text-[15px] text-[#c1c1c1]">Casual Leave</h4>
                </div>
                <div className="item">
                  <h2 className="text-[17px]">
                    <span className="text-[30px] text-[var(--primary)]">
                      12
                    </span>
                    /21
                  </h2>
                  <h4 className="text-[15px] text-[#c1c1c1]">Paid Leave</h4>
                </div>
                <div className="item">
                  <h2 className="text-[17px]">
                    <span className="text-[30px] text-[var(--primary)]">
                      02
                    </span>
                    /02
                  </h2>
                  <h4 className="text-[15px] text-[#c1c1c1]">
                    Restricted Leave
                  </h4>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="table-wrapper flex min-h-[45vh] max-h-[45vh] overflow-auto justify-between">
              <div className="table w-full h-full relative">
                <table className="w-full h-full border-collapse">
                  <thead className="sticky top-0 bg-[var(--card)]">
                    <tr>
                      <th className="text-start text-[14px]">Date</th>
                      <th className="text-start text-[14px]">Leave Type</th>
                      <th className="text-start text-[14px]">From</th>
                      <th className="text-start text-[14px]">To</th>
                      <th className="text-start text-[14px]">Reason</th>
                      <th className="text-start text-[14px]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="text-start text-[14px] text-[#b9b9b9]">
                          {item?.date}
                        </td>
                        <td className="text-start text-[14px] text-[#b9b9b9]">
                          {item?.leaveType}
                        </td>
                        <td className="text-start text-[14px] text-[#b9b9b9]">
                          {item?.from}
                        </td>
                        <td className="text-start text-[14px] text-[#b9b9b9]">
                          {item?.to}
                        </td>
                        <td className="text-start text-[14px] text-[#b9b9b9]">
                          {item?.reason}
                        </td>
                        <td
                          className="text-start text-[14px] font-bold"
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
            </div>
          </Card>
        </div>
        <div className="end-content flex gap-5 h-full w-[50%] relative">
          <Card className="w-[100%] h-[40vh]">
            <div className="flex flex-col items-start gap-1">
              <h1 className="font-bold text-[var(--secondary)]">
                Public Holidays
              </h1>
              <div className="items-container stats !gap-4">
                {holidayList.map((item: any, index: number) => (
                  <div
                    className="item !flex-row !w-[100%] justify-between rounded"
                    key={index}
                  >
                    <h2 className="text-[17px]">{item?.label}</h2>
                    <h4 className="text-[15px] text-[#c1c1c1]">
                      {item?.value}
                    </h4>
                  </div>
                ))}

                <h5 className="text-[12px] underline w-full text-end cursor-pointer">
                  See All
                </h5>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
