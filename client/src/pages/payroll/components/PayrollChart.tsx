import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { data } from "../data";

const PayrollChart = () => {
  return (
    <div className="w-full flex items-center justify-between px-2 h-full mt-2">
      <div className="flex flex-col items-start gap-3 p-3 rounded-xl bg-gray-800 w-[50%] h-full">
        <div className="">
          <h3 className="text-[15px] font-semibold">Payroll History</h3>
          <p className="text-[13px] text-gray-400">Checkout the Total payout vs Requested</p>
        </div>
        <div className="w-full flex h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="pv"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="uv"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default PayrollChart;
