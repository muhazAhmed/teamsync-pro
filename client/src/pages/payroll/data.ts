import moment from "moment"
const currYear = moment().format('YYYY')

export const dateFilter = [
    { id: 1, label: "Jan " + currYear, value: "01-" + currYear },
    { id: 2, label: "Feb " + currYear, value: "02-" + currYear },
    { id: 3, label: "Mar " + currYear, value: "03-" + currYear },
    { id: 4, label: "Apr " + currYear, value: "04-" + currYear },
    { id: 5, label: "May " + currYear, value: "05-" + currYear },
    { id: 6, label: "Jun " + currYear, value: "06-" + currYear },
    { id: 7, label: "Jul " + currYear, value: "07-" + currYear },
    { id: 8, label: "Aug " + currYear, value: "08-" + currYear },
    { id: 9, label: "Sep " + currYear, value: "09-" + currYear },
    { id: 10, label: "Oct " + currYear, value: "10-" + currYear },
    { id: 11, label: "Nov " + currYear, value: "11-" + currYear },
    { id: 12, label: "Dec " + currYear, value: "12-" + currYear },
    { id: 13, label: "Custom", value: "custom" }
]

export const payrollCardData = [
    { icon: "cash", amount: 256, label: "Total Earned", statValue: "+3.4%" },
    { icon: "gauge", amount: "$3,256", label: "Avg Salary", statValue: "-2.7%" },
    { icon: "clockLeft", amount: "$8,256", label: "Total Outstanding", statValue: "+3.4%" },
    { icon: "", amount: 0, label: "testing for something", statValue: "+1.22%" }
]

export const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];