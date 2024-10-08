import moment from "moment";

const today = moment().format("DD-MM-YYYY");

export const hrDemoData = {
    _id: "550955a76c2c47dc4ba1d4fd",
    firstName: "HR",
    lastName: "demo",
    email: "hrdemo@gmail.com",
    phone: "0000000000",
    password: "demo",
    companyEmail: "hrdemo@teamsync.com",
    employeeID: "DEMO202400",
    isHR: true,
    lastLogin: "2024-04-18 @ 02:10:50 PM && 127.0.0.1",
    personalInformation: {
        dob: "01-01-2000",
        nationality: "Indian",
        maritalStatus: "Single",
        bloodGroup: "A+",
        fatherName: "",
        placeOfBirth: "",
        religion: "",
        physicallyChallenged: false,
    },
    employment: {
        department: "Demo Department",
        designation: "Demo Designation",
        workLocation: "Demo Location",
        startDate: "01-01-2001",
        reportingManager: "Demo Manager",
        ctc: 0,
        status: true,
    },
    createdAt: {
        $date: "2024-03-29T14:06:03.765Z",
    },
    updatedAt: {
        $date: "2024-04-18T08:40:50.462Z",
    },
    __v: 0,
};

export const empDemoData = {
    _id: "660530a76c2c47dc4ba1d4fd",
    firstName: "emp",
    lastName: "Demo",
    email: "empdemo@gmail.com",
    phone: "0000000000",
    password: "demo",
    companyEmail: "empdemo@teamsync.com",
    employeeID: "DEMO202400",
    isHR: false,
    lastLogin: "2024-03-31 @ 06:30:10 PM && 127.0.0.1",
    personalInformation: {
        dob: "01-01-2000",
        nationality: "Indian",
        maritalStatus: "Single",
        bloodGroup: "A+",
        fatherName: "",
        placeOfBirth: "",
        religion: "",
        physicallyChallenged: false,
    },
    employment: {
        department: "Demo Department",
        designation: "Demo Designation",
        workLocation: "Demo Location",
        startDate: "01-01-2001",
        reportingManager: "Demo Manager",
        ctc: 0,
        status: true,
    },
    createdAt: {
        $date: "2024-03-31T12:23:03.638Z",
    },
    updatedAt: {
        $date: "2024-03-31T13:00:10.526Z",
    },
    __v: 0,
};

export const UpdateRequestDemo = [
    {
        personalInformation: {
            dob: "",
            nationality: "Indian",
            maritalStatus: "",
            bloodGroup: "",
            fatherName: "",
            placeOfBirth: "Mangalore",
            religion: "",
            physicallyChallenged: false,
            employeeID: "DEMO202401"
        },
        _id: "66310562af4910641a6736c3",
        userId: "6630f10531a88e7f27ac2670",
        firstName: "HR",
        phone: "7123548963",
        location: "Bangalore",
        isHR: false,
        createdAt: "2024-04-30T14:51:14.458Z",
        updatedAt: "2024-05-07T12:50:32.999Z",
        __v: 0,
        priority: "medium",
        department: "developer",
    },
    {
        personalInformation: {
            dob: "",
            nationality: "Indian",
            maritalStatus: "",
            bloodGroup: "",
            fatherName: "",
            placeOfBirth: "Mangalore",
            religion: "",
            physicallyChallenged: false,
        },
        _id: "66436f58cb5369572dac72bd",
        userId: "6630f10531a88e7f27ac2852",
        firstName: "Muhaz",
        phone: "7123558963",
        location: "Mangalore",
        isHR: false,
        createdAt: "2024-04-30T14:51:14.458Z",
        updatedAt: "2024-05-07T12:50:32.999Z",
        __v: 0,
        priority: "high",
        department: "developer",
    },
]

export const allAttendanceData = {
    "lastCheckInUpdate": "",
    "totalHoursCompletedToday": "4.00",
    "totalHoursCompletedThisWeek": "23.56",
    "totalHoursCompletedThisMonth": "33.56",
    "todayOvertime": "0.00",
    "firstSwipe": "09:00",
    "secondSwipe": "13:00",
    "thirdSwipe": 0,
    "fourthSwipe": 0
}

export const attendanceList = [
    {
        date: "10-03-2024",
        firstSwipe: "10:00 AM",
        secondSwipe: "01:00 PM",
        thirdSwipe: "02:00 PM",
        fourthSwipe: "06:00 PM",
        total: "7 hrs",
    },
    {
        date: "10-03-2024",
        firstSwipe: "10:00 AM",
        secondSwipe: "01:00 PM",
        thirdSwipe: "02:00 PM",
        fourthSwipe: "06:00 PM",
        total: "7 hrs",
    },
];

export const leaveData = [
    { date: "05/07/2023", leaveType: "Paid Leave", from: "05/07/2023", to: "05/07/2023", reason: "-", status: "Pending" },
    { date: "12/06/2023", leaveType: "Casual Leave", from: "12/06/2023", to: "12/06/2023", reason: "-", status: "Rejected" },
    { date: "21/05/2023", leaveType: "Casual Leave", from: "21/05/2023", to: "22/05/2023", reason: "Sick", status: "Approved" },
    { date: "01/05/2023", leaveType: "Casual Leave", from: "01/05/2023", to: "12/06/2023", reason: "Eid", status: "Approved" },
]

export const leavePendingReq = [
    { date: "05/07/2023", leaveType: "Paid Leave", from: "05/07/2023", to: "05/07/2023", reason: "-", status: "Pending" },
    { date: "12/06/2023", leaveType: "Casual Leave", from: "12/06/2023", to: "12/06/2023", reason: "-", status: "Pending" },
    { date: "21/05/2023", leaveType: "Casual Leave", from: "21/05/2023", to: "22/05/2023", reason: "Sick", status: "Pending" },
    { date: "01/05/2023", leaveType: "Casual Leave", from: "01/05/2023", to: "12/06/2023", reason: "Eid", status: "Pending" },
]

export const calendarEvents = [
    { date: today, title: "Demo holiday", type: "holiday" },
    { date: "12-08-2024", title: "Team Meeting", type: "meeting" },
    { date: "12-08-2024", title: "Team Meeting", type: "meeting" },
];

export const feedPosts = [
    { id: 1, profile: "https://i.pinimg.com/736x/30/84/c2/3084c269aa626fcc51443cdc5a930e45.jpg", name: "Muhaz Ahmed", date: "12 April at 09:28 PM", caption: "One of the perks of working in an international company is sharing knowledge with your colleagues.", image: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg", comments: "25 Comments", likes: "120k Likes", shares: "231 Shares", saved: "12 Saved" },
    { id: 2, profile: "https://photosnow.org/wp-content/uploads/2024/04/cute-girl-pic-baby_18.jpg", name: "Rachel", date: "10 April at 07:42 PM", caption: "One of the perks of working in an international company is sharing knowledge with your colleagues.", image: "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg", comments: "100 Comments", likes: "260k Likes", shares: "343 Shares", saved: "120 Saved" },
]

export const loanData = [
    {id: "1A20RS", date: "Mar 13, 2024", amount: "$1250", loanStatus: "Pending", reporter: "Arun", repaymentStatus: "-"},
    {id: "9R84FE", date: "Jan 23, 2024", amount: "$550", loanStatus: "Accepted", reporter: "Arun", repaymentStatus: "Paid"},
]