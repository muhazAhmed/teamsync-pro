import "./style.css";
import DateRangePicker from "../../../../../UI-Components/DatePicker/DateRangePicker";
import moment, { Moment } from "moment";
import { FC, useState } from "react";
import {
  disableFutureDays,
  formatDate,
} from "../../../../../utils/commonFunctions";
import Modal from "../../../../../UI-Components/popUp-modal/PopUpModal";
import { Button } from "@nextui-org/react";
import Loader from "../../../../../UI-Components/Loader/Loader";

interface ModalProps {
  setModal: (value: boolean) => void;
  loading: boolean;
}

const AllAttendanceModal: FC<ModalProps> = ({ setModal, loading }) => {
  const [startDate, setStartDate] = useState<Moment>(moment().startOf("day"));
  const [endDate, setEndDate] = useState<Moment>(moment().endOf("day"));
  const [openCalender, setOpenCalender] = useState<boolean>(false);
  const isDateAfterToday = (date: any) => {
    return disableFutureDays(date);
  };

  const handleApply = (startDate: Moment | null, endDate: Moment | null) => {
    console.log("Start Date:", formatDate(startDate));
    console.log("End Date:", formatDate(endDate));
  };

  const attendanceList = [
    {
      date: "10-03-2024",
      firstSwipe: "10:00 AM",
      secondSwipe: "01:00 PM",
      thirdSwipe: "02:00 PM",
      fourthSwipe: "06:00 PM",
      total: "7 hrs",
      overtime: "0 hrs",
    },
    {
        date: "10-03-2024",
        firstSwipe: "10:00 AM",
        secondSwipe: "01:00 PM",
        thirdSwipe: "02:00 PM",
        fourthSwipe: "06:00 PM",
        total: "7 hrs",
        overtime: "1 hrs",
    },
  ];

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
                onClick={() => setOpenCalender(true)}
                style={{ color: "#fff" }}
              >
                Filter
              </Button>
            </div>

            <table>
              <thead>
                <tr style={{color: "#fff"}}>
                  <th>S. No</th>
                  <th>Date</th>
                  <th>First Swipe</th>
                  <th>Second Swipe</th>
                  <th>Third Swipe</th>
                  <th>Fourth Swipe</th>
                  <th>Total</th>
                  <th>Overtime</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.date}</td>
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
      </Modal>
    </div>
  );
};

export default AllAttendanceModal;
