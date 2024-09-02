import contactModal from "../../models/services/contact.js";
import { REQUIRE_FIELD, RESPONSE_MESSAGE } from "../../utils/validations.js";

export const newMessage = async (req, res) => {
    try {
        const data = req.body;
        const {firstName, lastName, email, phone, message} = data;
        if (!firstName) return res.status(400).json(REQUIRE_FIELD("First Name"))
        if (!email) return res.status(400).json(REQUIRE_FIELD("Email"));
        if (!message) return res.status(400).json(REQUIRE_FIELD("Message"));

        await contactModal.create(data);
        return res.status(201).json({message: RESPONSE_MESSAGE("").GET_BACK_TO_YOU})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}