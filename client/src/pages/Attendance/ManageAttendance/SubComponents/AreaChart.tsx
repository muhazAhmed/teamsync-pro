import { AreaChart } from "@tremor/react";

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

const valueFormatter = (number: number): string =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

const AreaChartData: React.FC = () => {
  return (
    <>
      <AreaChart
        data={data}
        index="date"
        categories={["Time", "Sponsored"]}
        colors={["transparent", "green"]}
        valueFormatter={valueFormatter}
        showLegend={false}
        showYAxis={false}
        showGradient={false}
        showGridLines={false}
        showAnimation={true}
        startEndOnly={true}
        className="mt-6 h-32"
        style={{ height: "100%" }}
        curveType="monotone"
      />
    </>
  );
};

export default AreaChartData;
