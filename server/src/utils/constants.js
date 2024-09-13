import moment from "moment";
import { fetchDateTime } from "./helper.js";

// export const API_URL = `http://localhost:${process.env.PORT || 8800}/api`;
export const API_URL = `https://teamsync.onrender.com/api`

// export const CLIENT_URL = "http://localhost:5173"
export const CLIENT_URL = "https://teamsync-pro.netlify.app"

export const fetchAllUserIds = `${API_URL}/user/fetch-all-users`;
export const today = moment().format("DD-MM-YYYY");