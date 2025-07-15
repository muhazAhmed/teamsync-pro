import { useEffect, useState } from "react";
import { usePageName } from "../../utils/commonFunctions";
import GreetingsLayer from "./components/GreetingsLayer";
import AttendanceCard from "./components/AttendanceCard";
import Loader from "../../ui-library/Loader/Loader";
import TaskCard from "./components/TaskCard";
import AttendanceSummary from "./components/AttendanceSummary";
import Productivity from "./components/Productivity";
import Extras from "./components/Extras";
import Calender from "./components/Calender";
import Atoms from "./components/Atoms";
import ShareYourThoughts from "./components/ShareYourThoughts";

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
        <div className="flex flex-col md:flex-row w-full gap-3 mb-2">
          <div className="flex flex-col md:w-[30%] gap-3">
            <AttendanceCard setLoading={setLoading} />
            <Productivity />
            <Atoms />
          </div>
          <div className="flex flex-col md:w-[35%] gap-3">
            <TaskCard setLoading={setLoading} />
            <Extras />
            <ShareYourThoughts />
          </div>
          <div className="flex flex-col md:w-[35%] gap-3">
            <AttendanceSummary />
            <Calender />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
