import attendanceModal from "../../models/attendance/attendanceModal.js";
import employeeModal from "../../models/Employee/employeeModel.js";
import hrModal from "../../models/HR/hrModel.js";
import { fetchDateTime } from "../../utils/helper.js";
import { REQUIRE_FIELD, RESPONSE_MESSAGE } from "../../utils/validations.js";

export const newAttendance = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        if (!id) return res.status(404).json(REQUIRE_FIELD("User-ID"))
        const { userId, date, note, firstSwipe, secondSwipe, thirdSwipe, fourthSwipe } = data;
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
        const { firstSwipe, secondSwipe, thirdSwipe, fourthSwipe, note } = data;

        const updateData = await attendanceModal.findOneAndUpdate(
            { _id: req.params.id },
            { $set: data },
            { new: true }
        );
        return res.status(200).json({ updateData, message: RESPONSE_MESSAGE("").ATTENDANCE_ADDED })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}