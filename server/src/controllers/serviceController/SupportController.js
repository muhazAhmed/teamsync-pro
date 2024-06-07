import supportModal from "../../models/services/support.js";
import { REQUIRE_FIELD, RESPONSE_MESSAGE } from "../../utils/validations.js";

export const newSupportReq = async (req, res) => {
    try {
        const data = req.body;
        const {userId, priority, subject, description, reportingManager} = data;
        if (!priority) return res.status(400).json(REQUIRE_FIELD("Priority"))
        if (!subject) return res.status(400).json(REQUIRE_FIELD("Subject"))
        if (!description) return res.status(400).json(REQUIRE_FIELD("Description"))

        data.userId = req.params.id;
        await supportModal.create(data)
        return res.status(201).json({message: "Request Submitted Successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchOneSupportReq = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchAllSupportReq = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const updateSupportReq = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const deleteSupportReq = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}