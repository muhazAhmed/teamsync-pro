import attendanceModal from "../../models/attendance/attendanceModal.js";
import { fetchDateTime, timeDifferenceInMinutes } from "../../utils/helper.js";
import { REQUIRE_FIELD, RESPONSE_MESSAGE } from "../../utils/validations.js";

export const newAttendance = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        if (!id) return res.status(404).json(REQUIRE_FIELD("User-ID"))
        const { userId, date, note, firstSwipe, secondSwipe, thirdSwipe, fourthSwipe, status } = data;
        data.userId = id;
        data.date = fetchDateTime("date").split("-").reverse().join("-")
        const resData = await attendanceModal.create(data)
        return res.status(201).json({ resData, message: RESPONSE_MESSAGE("").ATTENDANCE_ADDED })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const fetchOneAttendance = async (req, res) => {
    try {
        const id = req.params.id;
        const today = fetchDateTime("date").split("-").reverse().join("-")
        const fetchOneDate = await attendanceModal.findOne({ userId: id, date: today })
        if (fetchOneDate === null) return res.status(200).json("")
        return res.status(200).json(fetchOneDate)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const fetchAllAttendance = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const updateAttendance = async (req, res) => {
    try {
        const data = req.body;
        const { firstSwipe, secondSwipe, thirdSwipe, fourthSwipe, note, status } = data;

        const today = fetchDateTime("date").split("-").reverse().join("-");
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
        console.log(totalFirstSwipeTimeDifference)
        console.log(totalSecondSwipeTimeDifference)

        const updateData = await attendanceModal.findOneAndUpdate(
            { _id: req.params.id },
            { $set: data },
            { new: true }
        );

        return res.status(200).json({ updateData, message: RESPONSE_MESSAGE("").ATTENDANCE_ADDED });
    } catch (error) {
        console.error('Error updating attendance:', error);
        return res.status(500).json({ message: error.message });
    }
};