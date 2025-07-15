import { useNavigate } from "react-router-dom";
import HoverAnimation from "../../../ui-library/HoverAnimation";
import { fetchUserId } from "../../../utils/commonFunctions";
import CardHeader from "./CardHeader";
import { icon } from "../../../ui-library/Icons";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { defaultComponentsClassName } from "../services";

const data = [
  { label: "Sun", value: 0 },
  { label: "Mon", value: 8 },
  { label: "Tue", value: 10 },
  { label: "Wed", value: 6 },
  { label: "Thu", value: 5 },
  { label: "Fri", value: 7 },
  { label: "Sat", value: 10 },
];

const AttendanceSummary = () => {
  const navigate = useNavigate();
  const id = fetchUserId();

  return (
    <>
      <HoverAnimation
        className={defaultComponentsClassName}
        onClick={() => navigate(`/attendance/manage/${id}`)}
      >
        <CardHeader label="Attendance Summary" />
        <div className="">
          <div className="flex flex-col gap-1 absolute bottom-10">
            <h5>
              <i className={`${icon?.circle} text-primary mr-2 text-sm`}></i>
              Present
            </h5>
            <h5>
              <i className="fa-regular fa-circle text-primary mr-2 text-sm"></i>
              Absent
            </h5>
          </div>

          <div className="flex justify-end w-full">
            <ResponsiveContainer width="70%" height={150}>
              <BarChart data={data} barSize={12}>
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <Bar dataKey="value" fill="#00ABE4" radius={[999, 999, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </HoverAnimation>
    </>
  );
};

export default AttendanceSummary;
