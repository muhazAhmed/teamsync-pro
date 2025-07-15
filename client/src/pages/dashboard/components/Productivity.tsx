import HoverAnimation from "../../../ui-library/HoverAnimation";
import { defaultComponentsClassName } from "../services";
import CardHeader from "./CardHeader";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Sun", value: 12 },
  { day: "Mon", value: 18 },
  { day: "Tue", value: 10 },
  { day: "Wed", value: 22 },
  { day: "Thu", value: 16 },
  { day: "Fri", value: 26 },
  { day: "Sat", value: 20 },
];

const Productivity = () => {
  return (
    <HoverAnimation className={defaultComponentsClassName}>
      <CardHeader label="Productivity This Week" isIconRequired={false} />
      <div>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={data}>
            <XAxis dataKey="day" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                background: "black",
                border: "none",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </HoverAnimation>
  );
};

export default Productivity;
