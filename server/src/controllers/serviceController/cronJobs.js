import cron from "node-cron";
import axios from "axios";
import { API_URL, fetchAllUserIds, today } from "../../utils/constants.js";
import moment from "moment";
import attendanceModal from "../../models/attendance/attendanceModal.js";

//============= Keep Server Alive ============
// cron.schedule('*/1 * * * *', async () => {
//     try {
//         const res = await axios.get(`http://localhost:8800/`);
//         console.log(res?.data)
//     } catch (error) {
//         console.error('Error While Fetching Data', error.message);
//     }
// });

// ============== To Fetch Attendance and Check Daily Status =================
cron.schedule('50 23 * * *', async () => {
    try {
        const holidays = [] // need to add holiday api call res
        if (moment().day() === 0 || holidays.includes(today)) {
            return console.log(`No Attendance Processing Since it's a Holiday`);
        }

        // Fetch all users with attendance records for today
        const usersToday = await attendanceModal.find({ date: today });

        if (usersToday.length == 0) {
            console.log('No attendance records found for today.');
        }

        const allUserIds = await axios.get(fetchAllUserIds)
        let data = allUserIds?.data;

        if (data) {
            for (const userId of data) {
                try {
                    const res = await axios.post(`${API_URL}/user/attendance/daily-check/${userId}`);
                    console.log(`Processed user ${userId}:`, res.data);
                } catch (error) {
                    console.error(`Error processing user ${userId}:`, error.message);
                }
            }
        } else {
            console.log("User id's Not Found")
        }

    } catch (error) {
        console.error('Error fetching users:', error.message);
    }
});