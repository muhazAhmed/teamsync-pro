import { FC } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartPops {
  data: any;
}

const DailyRecordChart: FC<ChartPops> = ({ data }) => {
  const ChartData = [
    {
      name: "First Swipe",
      "First Swipe": data?.firstSwipe.toString() || 0,
    },
    {
      name: "Second Swipe",
      "Second Swipe": 1 || 0,
    },
    {
      name: "Third Swipe",
      "Third Swipe": data?.thirdSwipe || 0,
    },
    {
      name: "Fourth Swipe",
      "Fourth Swipe": data?.fourthSwipe || 0,
    },
  ];

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={250}
          data={ChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 9]} />
          <Tooltip />
          <Bar dataKey="First Swipe" fill="#0070F0" activeBar={<Rectangle />} />
          <Bar
            dataKey="Second Swipe"
            fill="#9455D3"
            activeBar={<Rectangle />}
          />
          <Bar dataKey="Third Swipe" fill="#F31260" activeBar={<Rectangle />} />
          <Bar
            dataKey="Fourth Swipe"
            fill="#18C964"
            activeBar={<Rectangle />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default DailyRecordChart;
