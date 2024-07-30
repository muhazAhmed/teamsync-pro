import attendanceModal from "../../models/attendanceModal.js";
import { today } from "../../utils/constants.js";
import { calculateTotalHours, convertMinutesToHourMinuteFormat, timeDifferenceInMinutes } from "../../utils/helper.js";
import { REQUIRE_FIELD, RESPONSE_MESSAGE } from "../../utils/validations.js";
import moment from "moment";

export const newAttendance = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        if (!id) return res.status(404).json(REQUIRE_FIELD("User-ID"))
        const { userId, date, note, firstSwipe, secondSwipe, thirdSwipe, fourthSwipe, status, halfDay } = data;
        data.userId = id;
        data.date = today;
        const resData = await attendanceModal.create(data)
        return res.status(201).json({ resData, message: RESPONSE_MESSAGE("").ATTENDANCE_ADDED })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR)
    }
}

export const fetchOneAttendance = async (req, res) => {
    try {
        const id = req.params.id;
        const fetchOneDate = await attendanceModal.findOne({ userId: id, date: today })
        if (fetchOneDate === null) return res.status(200).json("")
        return res.status(200).json(fetchOneDate)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR)
    }
}

export const fetchAllAttendance = async (req, res) => {
    try {

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR)
    }
}

export const updateAttendance = async (req, res) => {
    try {
        const data = req.body;
        const { firstSwipe, secondSwipe, thirdSwipe, fourthSwipe, note, status, halfDay } = data;

        const fetchOneData = await attendanceModal.findOne({ _id: req.params.id, date: today });
        if (fetchOneData.fourthSwipe.length > 0) return res.status(400).json(RESPONSE_MESSAGE("").MAX_SWIPE)

        if (!fetchOneData) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        let totalFirstSwipeTimeDifference = 0;
        let totalSecondSwipeTimeDifference = 0;
        const initialTime = fetchOneData.firstSwipe;

        if (initialTime && (fetchOneData.secondSwipe || secondSwipe)) {
            const secondSwipeTime = secondSwipe || fetchOneData.secondSwipe;
            totalFirstSwipeTimeDifference = timeDifferenceInMinutes(initialTime, secondSwipeTime);

            if (totalFirstSwipeTimeDifference >= 540) {
                data.status = true;
            }
        }

        if (fetchOneData.thirdSwipe && (fetchOneData.fourthSwipe || fourthSwipe)) {
            const fourthSwipeTime = fourthSwipe || fetchOneData.fourthSwipe;
            totalSecondSwipeTimeDifference = timeDifferenceInMinutes(fetchOneData.thirdSwipe, fourthSwipeTime);

            if (totalSecondSwipeTimeDifference >= 540) {
                data.status = true;
            }
        }

        if (totalFirstSwipeTimeDifference + totalSecondSwipeTimeDifference >= 540) {
            data.status = true;
        }

        const updateData = await attendanceModal.findOneAndUpdate(
            { _id: req.params.id },
            { $set: data },
            { new: true }
        );

        return res.status(200).json({ updateData, message: RESPONSE_MESSAGE("").ATTENDANCE_ADDED });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
};

export const fetchAndCheckDaily = async (req, res) => {
    try {
        const data = req.body;
        const { note, secondSwipe, status, halfDay } = data;

        if (moment().day() === 0) {
            return res.status(200).json(`Today is Sunday. No attendance processing required for ${req.params.id}.`);
        }

        const fetchOneData = await attendanceModal.findOne({ userId: req.params.id, date: today });
        if (fetchOneData === null) {
            await attendanceModal.create(
                { date: today, note: "Absent (auto-generated)", userId: req.params.id, status: false },
            );
            return res.status(201).json(`No Attendance was Found for ${req.params.id}, Hence Created with Absent Request`)
        }
        if (fetchOneData && fetchOneData.firstSwipe) {
            if (fetchOneData.secondSwipe.length === 0) {
                await attendanceModal.findOneAndUpdate(
                    { userId: req.params.id, date: today },
                    { $set: { secondSwipe: "01:00", halfDay: true, status: true } },
                    { new: true }
                );
                return console.log("Crons Request Received, & Updated Successfully")
            }
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const attendanceDashboardData = async (req, res) => {
    try {
        let id = req.params.id;
        let data = {
            lastCheckInUpdate: "",
            totalHoursCompletedToday: "0.00",
            totalHoursCompletedThisWeek: "0.00",
            totalHoursCompletedThisMonth: "0.00",
            todayOvertime: "0.00",
            firstSwipe: 0.0,
            secondSwipe: 0.0,
            thirdSwipe: 0.0,
            fourthSwipe: 0.0
        }
        const startOfWeek = moment().startOf('isoWeek').format('DD-MM-YYYY');
        const startOfMonth = moment().startOf('month').format('DD-MM-YYYY');

        const fetchOneData = await attendanceModal.findOne({ userId: id, date: today })
        const fetchWeekData = await attendanceModal.find({ userId: id, date: { $gte: startOfWeek, $lte: today } });
        const fetchMonthData = await attendanceModal.find({ userId: id, date: { $gte: startOfMonth, $lte: today } });

        if (fetchOneData) {
            const swipes = [fetchOneData.firstSwipe, fetchOneData.secondSwipe, fetchOneData.thirdSwipe, fetchOneData.fourthSwipe];
            for (let i = swipes.length - 1; i >= 0; i--) {
                if (swipes[i].length > 0) {
                    data.lastCheckInUpdate = swipes[i];
                    break;
                }
            }

            const currentTime = moment().format("HH:mm");
            if (swipes[0].length > 0) {
                let totalDuration = 0;

                const pairs = [
                    [swipes[0], swipes[1] || currentTime],
                    [swipes[2], swipes[3] || currentTime]
                ];

                pairs.forEach(pair => {
                    if (pair[0] && pair[1]) {
                        totalDuration += timeDifferenceInMinutes(pair[0], pair[1]);
                    }
                });

                data.totalHoursCompletedToday = convertMinutesToHourMinuteFormat(totalDuration);

                const totalHours = totalDuration / 60;
                if (totalHours > 9) {
                    const overtime = totalDuration - (9 * 60);
                    data.todayOvertime = convertMinutesToHourMinuteFormat(overtime);
                } else {
                    data.todayOvertime = "0.00";
                };
                data.firstSwipe = swipes[0] || 0;
                data.secondSwipe = swipes[1] || 0;
                data.thirdSwipe = swipes[2] || 0;
                data.fourthSwipe = swipes[3] || 0;
            } else {
                data.totalHoursCompletedToday = "0.00";
            }
        }

        data.totalHoursCompletedThisWeek = calculateTotalHours(fetchWeekData);
        data.totalHoursCompletedThisMonth = calculateTotalHours(fetchMonthData);

        return res.status(200).json(data)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchAttendanceByIdPageWise = async (req, res) => {
    try {
        const userId = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        const skip = (page - 1) * limit;
        const attendanceData = await attendanceModal.find({ userId })
            .skip(skip)
            .limit(limit);
        const totalCount = await attendanceModal.countDocuments({ userId });

        return res.status(200).json({
            data: attendanceData,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            totalItems: totalCount
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}