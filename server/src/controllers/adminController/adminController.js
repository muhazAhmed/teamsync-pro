import hrModel from "../../models/HR/hrModel.js";
import employeeModel from "../../models/Employee/employeeModel.js"

export const fetchAllUsers = async(req, res) => {
    try {
        const fetchHr = await hrModel.find();
        const fetchEmployee = await employeeModel.find();
        if (!fetchHr && !fetchEmployee) return res.status(200).json("No Users found");
        const allUsers = {
            hr: fetchHr,
            employee: fetchEmployee
        };
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json(error?.message);
    }
}