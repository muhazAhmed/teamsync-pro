import { useEffect, useState } from "react";
import { usePageName } from "../../utils/commonFunctions";
import GreetingsLayer from "./components/GreetingsLayer";
import AttendanceCard from "./components/AttendanceCard";
import Loader from "../../ui-library/Loader/Loader";
import TaskCard from "./components/TaskCard";
import AttendanceSummary from "./components/AttendanceSummary";

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    usePageName("Dashboard");
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="w-full px-3 flex flex-col gap-3">
        <GreetingsLayer />
        <div className="flex w-full gap-3">
          <div className="flex flex-col w-[30%] gap-3">
            <AttendanceCard setLoading={setLoading} />
          </div>
          <div className="flex flex-col w-[30%] gap-3">
            <TaskCard setLoading={setLoading} />
          </div>
          <div className="flex flex-col w-[38%] gap-3">
            <AttendanceSummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
