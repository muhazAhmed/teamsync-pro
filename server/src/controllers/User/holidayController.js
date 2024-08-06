import holidaysModel from "../../models/holidaysModel.js";
import { REQUIRE_FIELD, RESPONSE_MESSAGE } from "../../utils/validations.js";

export const newHoliday = async(req, res) => {
    try {
        const data = req.body;
        const {title, description, date} = data;
        if (!title) return res.status(400).json({message: REQUIRE_FIELD("Title")});
        if (!description) return res.status(400).json({message: REQUIRE_FIELD("Description")});
        if (!date) return res.status(400).json({message: REQUIRE_FIELD("Date")});

        await holidaysModel.create(data);
        return res.status(201).json({message: RESPONSE_MESSAGE("").ADDED});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchAllHolidays = async(req, res) => {
    try {
        const fetchData = await holidaysModel.find();
        return res.status(200).json(fetchData);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchOneHoliday = async(req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({message: RESPONSE_MESSAGE("").NO_DATA});

        const fetchOneData = await holidaysModel.findById({_id: id});
        return res.status(200).json(fetchOneData);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const updateHoliday = async(req, res) => {
    try {
        const data = req.body;
        const {title, description, date} = data;
        const id = req.params.id;
        if (!id) return res.status(400).json({message: RESPONSE_MESSAGE("").NO_DATA});
        await holidaysModel.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        );
        return res.status(200).json({ message: RESPONSE_MESSAGE("").USER_UPDATE });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const deleteHoliday = async(req, res) => {
    try {
        const reqId = req.params.id;
        await holidaysModel.findByIdAndDelete(reqId);
        return res.status(200).json({message: RESPONSE_MESSAGE("").DELETE_SUCCESS});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}