import jwt from "jsonwebtoken";

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
  return `${firstName.toLowerCase()}.${phone.split("").slice(7,10).join("")}${CompanyMail()}`;
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