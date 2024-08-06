import eventModel from "../../models/EventsModel.js";
import { RESPONSE_MESSAGE } from "../../utils/validations.js";

export const newEvent = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchAllEvents = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchOneEvents = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const updateEvent = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const deleteEvent = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}