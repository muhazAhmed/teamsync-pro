import { fetchDateTime } from "./helper.js";

// export const API_URL = `http://localhost:${process.env.PORT || 8800}/api`;
export const API_URL = `https://teamsync.onrender.com/api`

export const fetchAllUserIds = `${API_URL}/user/fetch-all-users`;
export const today = fetchDateTime("date").split("-").reverse().join("-");