import "./style.css";
import DateRangePicker from "../../../../../UI-Components/DatePicker/DateRangePicker";
import moment, { Moment } from "moment";
import { FC, useEffect, useState } from "react";
import {
  CheckAccess,
  PaginationResponseInstances,
  disableFutureDays,
  fetchUserId,
  formatDate,
} from "../../../../../utils/commonFunctions";
import { Button, Tooltip } from "@nextui-org/react";
import Loader from "../../../../../ui-library/Loader/Loader";
import { Icon, icon } from "../../../../../ui-library/Icons";
import usePagination from "../../../../../hooks/usePagination";
import Pagination from "../../../../../UI-Components/Pagination/Pagination";
import { getMethodAPI } from "../../../../../utils/apiCallMethods";
import { serverVariables } from "../../../../../utils/serverVariables";
import Modal from "../../../../../ui-library/Modal";
// import toast from "react-hot-toast";
// import { message } from "../../../../../utils/Constants";

interface ModalProps {
  setModal: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  loading: boolean;
}

const AllAttendanceModal: FC<ModalProps> = ({
  setModal,
  loading,
  setLoading,
}) => {
  const [startDate, setStartDate] = useState<Moment>(moment().startOf("day"));
  const [endDate, setEndDate] = useState<Moment>(moment().endOf("day"));
  const [openCalender, setOpenCalender] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  // const [status, setStatus] = useState<string>("all");
  const [paginationDetails, setPaginationDetails] = useState<any>();
  const [itemsPerPage] = useState<number>(1);
  const isDateAfterToday = (date: any) => {
    return disableFutureDays(date);
  };

  const fetchData = async (page: number) => {
    const res = await getMethodAPI(
      `${serverVariables?.FETCH_ATTENDANCE_BY_PAGE}${fetchUserId()}?page=${page}&limit=${itemsPerPage}`,
      "",
      setLoading
    );
    PaginationResponseInstances(res, 200, (responseData: any) => {
      setData(responseData?.data);
      setPaginationDetails([
        { totalPages: responseData?.totalPages },
        { totalItems: responseData?.totalItems },
      ]);
    });
  };

  // const handleFilterChange = (status: string) => {
  //   setStatus(status);
  //   toast.success(message("Status").FILTER_APPLIED);
  // };

  const handleApply = (startDate: Moment | null, endDate: Moment | null) => {
    console.log("Start Date:", formatDate(startDate));
    console.log("End Date:", formatDate(endDate));
  };

  // const filteredListData = data?.filter((item: any) => {
  //   if (status === "all") return true;
  //   return item.priority === status;
  // });

  const { currentData, currentPage, goToPage, nextPage, prevPage } =
    usePagination({ data: data, itemsPerPage });

  useEffect(() => {
    if (CheckAccess()?.isDemoAccount) {
    } else {
      fetchData(currentPage);
    }
  }, [currentPage]);

  return (
    <div className="all-attendance">
      {loading && <Loader />}
      <Modal
        setModal={setModal}
        title={`From: ${formatDate(startDate)} To: ${formatDate(endDate)}`}
      >
        {openCalender && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "15px",
              zIndex: "10",
            }}
          >
            <DateRangePicker
              disabledDates={isDateAfterToday}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              onApply={handleApply}
              setModal={setOpenCalender}
            />
          </div>
        )}
        <div className="table">
          <div className="table-wrapper">
            <div className="header">
              <h1>Attendance List</h1>
              <Button
                variant="shadow"
                className="btn-primary"
                onPress={() => setOpenCalender(true)}
                style={{ color: "#fff" }}
              >
                {Icon("calendar")}Change Date
              </Button>
            </div>

            <table>
              <thead>
                <tr style={{ color: "#fff" }}>
                  <th>S. No</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>First Swipe</th>
                  <th>Second Swipe</th>
                  <th>Third Swipe</th>
                  <th>Fourth Swipe</th>
                  <th>Total</th>
                  <th>Overtime</th>
                </tr>
              </thead>
              <tbody>
                {currentData?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.date}</td>
                    <td>{item?.status ? <PresentIcon /> : <AbsentIcon />}</td>
                    <td>{item?.firstSwipe}</td>
                    <td>{item?.secondSwipe}</td>
                    <td>{item?.thirdSwipe}</td>
                    <td>{item?.fourthSwipe}</td>
                    <td>{item?.total}</td>
                    <td>{item?.overtime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {data?.length && (
          <Pagination
            currentPage={currentPage}
            totalPages={paginationDetails[0]?.totalPages}
            goToPage={goToPage}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        )}
      </Modal>
    </div>
  );
};

export default AllAttendanceModal;

const PresentIcon = () => {
  return (
    <Tooltip content="Present" placement="left" color="primary">
      <i
        className={icon?.alphabetP}
        style={{
          color: "#fff",
          backgroundColor: "#18C964",
          padding: "6px 7px",
          borderRadius: "50%",
          fontWeight: "bold",
        }}
      ></i>
    </Tooltip>
  );
};

const AbsentIcon = () => {
  return (
    <Tooltip content="Absent" placement="left" color="primary">
      <i
        className={icon?.alphabetA}
        style={{
          color: "#fff",
          backgroundColor: "#F31260",
          padding: "6px 7px",
          borderRadius: "50%",
          fontWeight: "bold",
        }}
      ></i>
    </Tooltip>
  );
};
