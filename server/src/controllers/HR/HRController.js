import updateRequestModal from "../../models/HR/updateRequest.js"
import { getUserModelByRole } from "../../utils/helper.js";
import { RESPONSE_MESSAGE } from "../../utils/validations.js";

export const updateRequest = async (req, res) => {
    try {
        const data = req.body;
        data.userId = req.params.id;
        const existingRequests = await updateRequestModal.findOne({ userId: req.params.id });
        const role = data.isHr ? "hr" : "employee"
        const userModel = getUserModelByRole(role);
        const fetchUser = await userModel.findOne({ _id: data.userId})
        data.employeeID = fetchUser.employeeID;
        data.firstName = req.body.firstName ? req.body.firstName : fetchUser.firstName

        if (existingRequests === null) {
            const updateData = await updateRequestModal.create(data)
            return res.status(201).json({ updateData, message: RESPONSE_MESSAGE("").USER_UPDATE_REQ })
        } else {
            if (Object.keys(req.body).includes("personalInformation")) {
                existingRequests.personalInformation = Object.assign({},
                    existingRequests.personalInformation, req.body.personalInformation);
                const updatedRequest = await updateRequestModal.findOneAndUpdate(
                    { userId: req.params.id },
                    { $set: existingRequests },
                    { new: true }
                );
                return res.status(200).json({ updatedRequest, message: RESPONSE_MESSAGE("").USER_UPDATE_REQ });
            } else {
                const updatedRequest = await updateRequestModal.findOneAndUpdate(
                    { userId: req.params.id },
                    { $set: data },
                    { new: true }
                );
                return res.status(200).json({ updatedRequest, message: RESPONSE_MESSAGE("").USER_UPDATE_REQ });
            }

        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const fetchAllRequests = async (req, res) => {
    try {
        const fetchData = await updateRequestModal.find();
        if (!fetchData || fetchData.length === 0) {
            return res.status(200).json(RESPONSE_MESSAGE("").NO_REQUEST_FOUND);
        }
        const totalCount = fetchData.length;
        return res.status(200).json({ fetchData, message: RESPONSE_MESSAGE(totalCount).NEW_REQUESTS });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const fetchPriorityCounts = async (req, res) => {
    try {
        let data = {
            medium: 0,
            normal: 0,
            high: 0
        };
        const allData = await updateRequestModal.find();
        data.medium = allData.filter(item => item.priority === "medium").length;
        data.normal = allData.filter(item => item.priority === "normal").length;
        data.high = allData.filter(item => item.priority === "high").length;

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}