import { useEffect, useState } from "react";
import "./style.css";
import { openModal, usePageName } from "../../../utils/commonFunctions";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
import { Button, Progress } from "@nextui-org/react";
import DailyRecordChart from "./SubComponents/BarChart";
import AllAttendanceModal from "./SubComponents/AllAttendanceModal/AllAttendanceModal";
import Loader from "../../../UI-Components/Loader/Loader";

const ManageAttendance = () => {
  const [todayTotalHours, setTodayTotalHours] = useState(3.55);
  const [attendanceModal, setAttendanceModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const percentage = (todayTotalHours / 9) * 100;
  useEffect(() => {
    usePageName("Attendance / Dashboard");
  }, []);

  const statisticsData = [
    {
      label: "Today",
      hours: `${todayTotalHours} / 9 hrs`,
      color: "primary",
      value: percentage,
    },
    { label: "This Week", hours: `25 / 40 hrs`, color: "secondary", value: 75 },
    { label: "This Month", hours: `90 / 160 hrs`, color: "danger", value: 50 },
    { label: "Overtime", hours: `5 hrs`, color: "success", value: 20 },
  ];

  const attendanceList = [
    {
      date: "10-03-2024",
      firstSwipe: "10:00 AM",
      secondSwipe: "01:00 PM",
      thirdSwipe: "02:00 PM",
      fourthSwipe: "06:00 PM",
      total: "7 hrs",
    },
    {
      date: "10-03-2024",
      firstSwipe: "10:00 AM",
      secondSwipe: "01:00 PM",
      thirdSwipe: "02:00 PM",
      fourthSwipe: "06:00 PM",
      total: "7 hrs",
    },
  ];

  return (
    <div className="manage-attendance">
      {loading && <Loader />}
      {attendanceModal && <AllAttendanceModal setModal={setAttendanceModal} loading={loading} />}
      <div className="stats">
        <div className="current-stat">
          <div className="time-sheet">
            <h1>
              Timesheet <span>{moment().format("DD MMM YYYY")}</span>
            </h1>
          </div>
          <div className="punch-in">
            <h3>Check in at</h3>
            <p>Wed, 11th Mar 2024 12:32 AM</p>
          </div>
          <div className="progress-bar">
            <CircularProgressbar
              value={percentage}
              text={`${todayTotalHours} hrs`}
            />
          </div>

          <Button className="btn-primary">Check Out</Button>
        </div>
        <div className="overall">
          <h1>Statistics</h1>
          {statisticsData.map((item: any, index: number) => (
            <div className="progress" key={index}>
              <div className="progress-date">
                <h4>{item.label}</h4>
                <h4>{item.hours}</h4>
              </div>
              <div className="progress-graph">
                <Progress
                  color={item.color}
                  aria-label="Progress Graph"
                  value={item.value}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="activity">
          <h1>Daily Records</h1>
          <DailyRecordChart />
        </div>
      </div>
      <div className="detailed-stat">
        <div className="table">
          <div className="table-wrapper">
            <div className="header">
              <h1>Attendance List</h1>
              <Button
                variant="shadow"
                color="secondary"
                onClick={() => openModal(setAttendanceModal)}
              >
                View More
              </Button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>S. No</th>
                  <th>Date</th>
                  <th>First Swipe</th>
                  <th>Second Swipe</th>
                  <th>Third Swipe</th>
                  <th>Fourth Swipe</th>
                  <th>Total</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="daily-graph">
          <h1>Today Activity</h1>
        </div>
      </div>
    </div>
  );
};

export default ManageAttendance;
