import { useEffect, useState } from "react";
import "./style.css";
import { usePageName } from "../../../utils/commonFunctions";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
import { Button, Progress } from "@nextui-org/react";

const ManageAttendance = () => {
  const [todayTotalHours, setTodayTotalHours] = useState(3.55);
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

  return (
    <div className="manage-attendance">
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
          <div className="stat-footer">
            <h3>
              Break <span>1.21 hrs</span>
            </h3>
            <h3>
              Overtime <span>2 hrs</span>
            </h3>
          </div>
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
          <h1>Today Activity</h1>
        </div>
      </div>
      <div className="detailed-stat">
        <div className="table"></div>
        <div className="daily-graph"></div>
      </div>
    </div>
  );
};

export default ManageAttendance;
