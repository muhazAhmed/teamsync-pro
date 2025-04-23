import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Data {
  date: string;
  Time: number;
}

const data: Data[] = [
  { date: "Jun 01", Time: 10 },
  { date: "Jun 02", Time: 8 },
  { date: "Jun 03", Time: 9 },
  { date: "Jun 04", Time: 10 },
  { date: "Jun 05", Time: 10 },
  { date: "Jun 06", Time: 8 },
  { date: "Jun 07", Time: 0 },
  { date: "Jun 08", Time: 10 },
  { date: "Jun 09", Time: 8 },
  { date: "Jun 10", Time: 10 },
];

const AreaChartData: React.FC = () => {
  return (
    <div className="mt-6 h-32">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="date" />
          <YAxis hide />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Time"
            stroke="#4ade80"
            fill="transparent"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartData;
