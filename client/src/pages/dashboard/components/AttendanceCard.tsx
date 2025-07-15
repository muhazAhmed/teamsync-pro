import CheckInButton from "../../Attendance/AddAttendance/Button";
import HoverAnimation from "../../../ui-library/HoverAnimation";
import { useNavigate } from "react-router-dom";
import { fetchUserId } from "../../../utils/commonFunctions";
import CardHeader from "./CardHeader";
import { defaultComponentsClassName } from "../services";

const AttendanceCard = (setLoading: any) => {
  const navigate = useNavigate();
  const id = fetchUserId();

  return (
    <HoverAnimation
      className={defaultComponentsClassName}
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
