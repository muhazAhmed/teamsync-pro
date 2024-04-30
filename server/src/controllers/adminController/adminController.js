import hrModel from "../../models/HR/hrModel.js";
import employeeModel from "../../models/Employee/employeeModel.js";
import updateReqModal from "../../models/HR/updateRequest.js";
import { RESPONSE_MESSAGE } from "../../utils/validations.js";

export const fetchAllUsers = async (req, res) => {
  try {
    const fetchHr = await hrModel.find();
    const fetchEmployee = await employeeModel.find();
    if (!fetchHr && !fetchEmployee)
      return res.status(200).json("No Users found");
    const allUsers = {
      hr: fetchHr,
      employee: fetchEmployee,
    };
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json(error?.message);
  }
};

export const fetchUserByName = async (req, res) => {
  try {
    const { name } = req.query;
    const regex = new RegExp(name, "i");
    const filter = {
      firstName: regex,
    };

    const fetchHr = await hrModel.findOne(filter);
    const fetchEmployee = await employeeModel.findOne(filter);

    if (!fetchHr && !fetchEmployee) {
      return res.status(200).json({ message: "No Users found" });
    }

    const users = [fetchHr, fetchEmployee].filter(Boolean);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const userUpdateRequest = async (req, res) => {
  try {
    const data = req.body;
    let userId = req.params.userId;
    const newData = { userId, data };
    const result = await updateReqModal.create(newData);

    res
      .status(201)
      .json({ result, message: RESPONSE_MESSAGE("HR").USER_UPDATE });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
