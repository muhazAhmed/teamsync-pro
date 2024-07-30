import clientModal from "../../models/services/client.js";
import employeeModal from "../../models/employeeModel.js";
import hrModal from "../../models/HR/hrModel.js"
import { REQUIRE_FIELD, RESPONSE_MESSAGE, SUBSCRIPTION_ERROR } from "../../utils/validations.js";

export const newClientData = async (req, res) => {
  try {
    let data = req.body;
    let { email, newsLetter, isRegisteredUser, employeeId } = data;
    if (!email) return res.status(400).json(REQUIRE_FIELD("Email"));

    if (email) {
      let validate = await clientModal.findOne({ email })
      if (validate) return res.status(400).json(SUBSCRIPTION_ERROR);
      const fetchAllClientReq = await clientModal.find();
      let emailOnly;
      if (fetchAllClientReq.length) {
        emailOnly = fetchAllClientReq.map(item => item.email);
      }

      const fetchEmployees = await employeeModal.findOne({ $or: [{email}, {companyEmail: email}] })
      if (fetchEmployees) {
        if (emailOnly.includes(fetchEmployees.email) || emailOnly.includes(fetchEmployees.companyEmail)) 
          return res.status(400).json(SUBSCRIPTION_ERROR);
        data.isRegisteredUser = true;
        data.employeeId = fetchEmployees.employeeID
      }

      const fetchHr = await hrModal.findOne({ $or: [{email}, {companyEmail: email}] })
      if (fetchHr) {
        if (emailOnly.includes(fetchHr.email) || emailOnly.includes(fetchHr.companyEmail)) 
          return res.status(400).json(SUBSCRIPTION_ERROR);
        data.isRegisteredUser = true;
        data.employeeId = fetchHr.employeeID
      }
    }

    data.newsLetter = true;

    const response = await clientModal.create(data);
    if (response)
      return res.status(201).json({ message: RESPONSE_MESSAGE("")?.SUBSCRIPTION_SUCCESS });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const getOneClientData = async (req, res) => {
  try {
    const id = req.params.id;
    const fetchData = await clientModal.findOne({ email });
    if (!fetchData) return res.status(400).json("No Data Found");
    return res.status(200).json(fetchData);
  } catch (error) {
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const getAllClientData = async (req, res) => {
  try {
    const fetchData = await clientModal.find();
    return res.status(200).json(fetchData);
  } catch (error) {
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const updateClientData = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const deleteClientData = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};
