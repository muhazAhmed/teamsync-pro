import reportBug from "../../models/services/reportBug.js";

export const newBug = async (req, res) => {
    try {
        const data = req.body;
        const { date, userId, bug, pageURL, message } = data;
        await reportBug.create(data)
        return res.json({ message: "Bug Reported Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}