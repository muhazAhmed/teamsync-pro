import React, { useEffect, useState } from "react";
import "./style.css";
import {
  CheckAccess,
  ResponseInstances,
  fetchUserId,
  openModal,
  usePageName,
} from "../../../utils/commonFunctions";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
import { Button, Progress } from "@nextui-org/react";
import Loader from "../../../UI-Components/Loader/Loader";
import CheckInButton from "../AddAttendance/Button";
import { getMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
const AllAttendanceModal = React.lazy(() => import("./SubComponents/AllAttendanceModal/AllAttendanceModal"));
const LeaveStat = React.lazy(() => import("./SubComponents/DonutChart"));
const AreaChartData = React.lazy(() => import("./SubComponents/AreaChart"));
import { allAttendanceData, attendanceList } from "../../form/Demo";

type ResponseData = {
  [key: string]: any;
};

const ManageAttendance = () => {
  const [data, setData] = useState<ResponseData>();
  const [attendanceModal, setAttendanceModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const percentage = (data?.totalHoursCompletedToday / 9) * 100;
  useEffect(() => {
    usePageName("Attendance / Dashboard");
    if (!CheckAccess()?.isDemoAccount) {
      fetchDashboardData();
    } else {
      setData(allAttendanceData);
    }
  }, []);

  const fetchDashboardData = async () => {
    const res = await getMethodAPI(
      `${serverVariables?.ATTENDANCE_DETAILS}${fetchUserId()}`,
      "",
      setLoading
    );
    ResponseInstances(res, 200, (responseData: any) => {
      setData(responseData);
    });
  };

  const statisticsData = [
    {
      label: "Today",
      hours: `${data?.totalHoursCompletedToday || 0} / 9 hrs`,
      color: "primary",
      value: data?.totalHoursCompletedToday || 0,
      maxValue: 9,
    },
    {
      label: "This Week",
      hours: `${data?.totalHoursCompletedThisWeek || 0} / 45 hrs`,
      color: "secondary",
      value: data?.totalHoursCompletedThisWeek || 0,
      maxValue: 45,
    },
    {
      label: "This Month",
      hours: `${data?.totalHoursCompletedThisMonth || 0} / 180 hrs`,
      color: "danger",
      value: data?.totalHoursCompletedThisMonth || 0,
      maxValue: 180,
    },
    {
      label: "Overtime",
      hours: `${data?.todayOvertime || 0} hrs`,
      color: "success",
      value: data?.todayOvertime || 0,
      maxValue: 16,
    },
  ];

  return (
    <div className="manage-attendance">
      {loading && <Loader />}
      {attendanceModal && (
        <AllAttendanceModal
          setModal={setAttendanceModal}
          loading={loading}
          setLoading={setLoading}
        />
      )}
      <div className="stats">
        <div className="current-stat">
          <div className="time-sheet">
            <h1>
              Timesheet <span>{moment().format("DD MMM YYYY")}</span>
            </h1>
          </div>
          <div className="punch-in">
            <h3>Check in at</h3>
            <p>
              {moment().format("ddd, Do MMM YYYY")}{" "}
              {moment(data?.lastCheckInUpdate, "HH:mm").format("hh:mm A") ||
                "-"}
            </p>
          </div>
          <div className="progress-bar">
            <CircularProgressbar
              value={percentage}
              text={`${data?.totalHoursCompletedToday || 0} hrs`}
            />
          </div>

          <CheckInButton setLoading={setLoading} />
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
                  maxValue={item.maxValue}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="activity">
          <h1>Last 10 Days Records</h1>
          <AreaChartData />
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
                onPress={() => openModal(setAttendanceModal)}
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
          <h1>Leave Management</h1>
          <LeaveStat />
        </div>
      </div>
    </div>
  );
};

export default ManageAttendance;
