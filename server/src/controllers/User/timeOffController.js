import timeOffModel from "../../models/Employee/timeOffModel.js";
import { REQUIRE_FIELD, RESPONSE_MESSAGE } from "../../utils/validations.js";
import { getUserModelByRole } from "../../utils/helper.js";

export const newLeaveReq = async(req, res) => {
    try {
        const data = req.body;
        const { userId, leaveType, from, to, reason, status, reportingManager } = data;

        if (!from) return res.status(400).json({message: REQUIRE_FIELD("Start Date")});
        if (!to) return res.status(400).json({message: REQUIRE_FIELD("End Date")});
        if (!reason) data.reason = "NA";

        data.userId = req.params.id;
        const userModel = getUserModelByRole(req.params.role);
        const fetchUser = await userModel.findOne({ _id: req.params.id})
        if (!fetchUser) return res.status(404).json({message: RESPONSE_MESSAGE("").NO_USER_FOUND});
        data.reportingManager = fetchUser.reportingManager ? fetchUser.reportingManager : "";

        await timeOffModel.create(data);
        return res.status(201).json({message: RESPONSE_MESSAGE("").REQUEST_ADDED});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchOneLeaveReq = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchPendingLeaveReq = async(req, res) => {
    try {
        const fetchData = await timeOffModel.find({userId: req.params.id, status: "pending"})
        return res.status(200).json(fetchData);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchAllLeaveReq = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const updateLeaveReq = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}