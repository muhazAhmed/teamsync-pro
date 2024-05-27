import hrModel from "../models/HR/hrModel.js";
import employeeModel from "../models/Employee/employeeModel.js";

import jwt from "jsonwebtoken";
import moment from "moment";

export const fetchDateTime = (type) => {
    type = type.toLowerCase().trim();
    const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };

    let date = new Date();
    if (type === 'date' || type === "year" || type === "month" || type === "day") {
        date = date.toISOString();
        if (type === "date") {
            return date.split("T")[0]
        }
        else if (type === "year") {
            return date.split("T")[0].split("-")[0]
        }
        else if (type === "month") {
            return date.split("T")[0].split("-")[1]
        }
        else if (type === "day") {
            return date.split("T")[0].split("-")[2]
        }
    }
    else if (type === "time" || type === "hour" || type === "minute" || type === "second") {
        date = date.toLocaleString('en-US', options);

        if (type === "time") {
            return date.split(",")[1].trim()
        }
        else if (type === "hour") {
            return date.split(",")[1].trim().split(":")[0]
        }
        else if (type === "minute") {
            return date.split(",")[1].trim().split(":")[1]
        }
        else if (type === "second") {
            return date.split(",")[1].trim().split(":")[2]
        }
    } else {
        return `Invalid FetchDateTime Param "${type}"`
    }
}

export const EmployeeID = (type, role, lastData) => {
    if (type === "new") {
        return `${role}${fetchDateTime("year")}01`;
    }
    else if (type === "add" && lastData) {
        const id = role;
        const newIndex = parseInt(lastData.employeeID.split(`${role}`)[1]) + 1;
        return id + newIndex;
    } else {
        return `Invalid EmployeeID Param "${type}"`;
    }
}

export const CompanyMail = () => "@teamsync.com";

export const GenCompanyEmail = (firstName, phone) => {
    console.log(typeof phone)
    return `${firstName.toLowerCase()}.${phone.split("").slice(7, 10).join("")}${CompanyMail()}`;
};

export const GenJWT = (result) => {
    const token = jwt.sign(
        {
            userId: result._id.toString(),
        },
        process.env.JWT_SECRET
    );
    return token;
};

export const LastLoginWithIP = (req) => {
    let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ipAddress && ipAddress.includes(',')) {
        ipAddress = ipAddress.split(',')[0].trim();
    }
    if (ipAddress === '::1') {
        ipAddress = '127.0.0.1'; // Convert to IPv4 equivalent
    }
    return `${fetchDateTime("date")} @ ${fetchDateTime("time")} && ${ipAddress}`;
}

export const sumTimes = (time1, time2) => {
    function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    function minutesToTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    }

    const totalMinutes = timeToMinutes(time1) + timeToMinutes(time2);
    return minutesToTime(totalMinutes);
};

export const timeDifferenceInMinutes = (time1, time2) => {
    function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    const minutes1 = timeToMinutes(time1);
    const minutes2 = timeToMinutes(time2);

    return Math.abs(minutes2 - minutes1);
};

export const getUserModelByRole = (role) => {
    switch (role) {
        case 'hr':
            return hrModel;
        case 'admin':
            return adminModel;
        case 'employee':
            return employeeModel;
        default:
            return null;
    }
};

export const stringToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

export const convertMinutesToHourMinuteFormat = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}.${minutes < 10 ? '0' + minutes : minutes}`;
};

export const calculateTotalHours = (dataArray) => {
    let totalDuration = 0;
    dataArray.forEach(dayData => {
        const daySwipes = [dayData.firstSwipe, dayData.secondSwipe, dayData.thirdSwipe, dayData.fourthSwipe];
        if (daySwipes[0].length > 0) {
            const dayPairs = [
                [daySwipes[0], daySwipes[1] || moment().format("HH:mm")],
                [daySwipes[2], daySwipes[3] || moment().format("HH:mm")]
            ];

            dayPairs.forEach(pair => {
                if (pair[0] && pair[1]) {
                    totalDuration += timeDifferenceInMinutes(pair[0], pair[1]);
                }
            });
        }
    });
    return convertMinutesToHourMinuteFormat(totalDuration);
}