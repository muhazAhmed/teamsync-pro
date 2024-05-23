import { BarChart, Bar, ResponsiveContainer, CartesianGrid, Rectangle, Tooltip, XAxis, YAxis } from "recharts";

const ChartData = [
    {
        name: "First Swipe",
        "First Swipe": 3.1,
    },
    {
        name: "Second Swipe",
        "Second Swipe": 2,
    },
    {
        name: "Third Swipe",
        "Third Swipe": 5,
    },
    {
        name: "Fourth Swipe",
        "Fourth Swipe": 0,
    },
];

const DailyRecordChart = () => {
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
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="First Swipe" fill="#0070F0" activeBar={<Rectangle />} />
                    <Bar dataKey="Second Swipe" fill="#9455D3" activeBar={<Rectangle />} />
                    <Bar dataKey="Third Swipe" fill="#F31260" activeBar={<Rectangle />} />
                    <Bar dataKey="Fourth Swipe" fill="#18C964" activeBar={<Rectangle  />} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default DailyRecordChart;
