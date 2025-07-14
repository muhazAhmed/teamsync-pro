import CheckInButton from "../../Attendance/AddAttendance/Button";
import HoverAnimation from "../../../ui-library/HoverAnimation";
import { useNavigate } from "react-router-dom";
import { fetchUserId } from "../../../utils/commonFunctions";
import CardHeader from "./CardHeader";

const AttendanceCard = (setLoading: any) => {
  const navigate = useNavigate();
  const id = fetchUserId();

  return (
    <HoverAnimation
      className="flex flex-col gap-3 w-full p-4 rounded-xl bg-primary/30 backdrop-blur-md border border-primary/40 shadow-md cursor-pointer"
      onClick={() => navigate(`/attendance/manage/${id}`)}
    >
      <CardHeader label="Attendance" />
      <h2 className="text-xl font-semibold">Checked in</h2>
      <div className="w-full flex justify-between items-center">
        <p>Today's work hours</p>
        <p>8h 30m</p>
      </div>
      <CheckInButton setLoading={setLoading} />
    </HoverAnimation>
  );
};

export default AttendanceCard;
