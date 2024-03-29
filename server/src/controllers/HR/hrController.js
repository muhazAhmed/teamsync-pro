import hrModel from "../../models/HR/hrModel.js";
import employeeModal from "../../models/Employee/employeeModal.js"
import bcrypt from "bcrypt";
import { EmployeeID, GenCompanyEmail, GenJWT, LastLoginWithIP } from "../../utils/helper.js";
import { EMAIL_EXISTS, PASSWORD_INCORRECT, REQUIRE_FELID, RESPONSE_MESSAGE } from "../../utils/validations.js";

export const newHr = async (req, res) => {
  try {
    let data = req.body;
    let { firstName, lastName, email, employeeID, companyEmail, location, phone, password, role, lastLogin } = data;
 
    const fetch = await hrModel.findOne({ email });
    if (fetch) return res.status(400).json(EMAIL_EXISTS());

    const fetchLastEmpId = await hrModel.find({});
    
      if (fetchLastEmpId.length === 0) {
        data.employeeID = EmployeeID("new", role);
      } else {
        const lastData = await hrModel.findOne().sort({ employeeID: -1 });
        data.employeeID = EmployeeID("add", role, lastData);
      }

      const fetchCompanyEmail = await hrModel.findOne({companyEmail});
      if (!fetchCompanyEmail) data.companyEmail = GenCompanyEmail(firstName, phone)
      
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    data.lastLogin = LastLoginWithIP(req);

    const result = await hrModel.create(data);
    const token = GenJWT(result)
    

    return res.status(201).json({ result, token, message: RESPONSE_MESSAGE(role).USER_REGISTER });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const loginHr = async (req, res) => {
  try {
    let data = req.body;
    let { companyEmail, password, role, lastLogin } = data;

    if (!companyEmail) {
      return res.status(400).json(REQUIRE_FELID("Email"));
    }

    if (!password) {
      return res.status(400).json(REQUIRE_FELID("Password"));
    }

    let getUser = await hrModel.findOne({ companyEmail });
    if (!getUser)
      return res.status(401).json(PASSWORD_INCORRECT());

    let matchPassword = await bcrypt.compare(password, getUser.password);
    if (!matchPassword)
      return res.status(401).json(PASSWORD_INCORRECT());

    const token = GenJWT(getUser);
    data.lastLogin = LastLoginWithIP(req);
    await hrModel.findOneAndUpdate(
      { companyEmail },
      { $set: { lastLogin: data.lastLogin } },
      { new: true }
    );

    const { newPassword, ...other } = getUser;
    let User = getUser;

    return res.status(200).json({ User, token, message: RESPONSE_MESSAGE(role).USER_LOGIN })
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const fetchOneHr = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await hrModel.findById(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateHr = async (req, res) => {
  try {
    const id = req.params.id;
    let data = req.body;

    const updatedData = await hrModel.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );
    return res.status(200).json({updatedData,  message: RESPONSE_MESSAGE("HR").USER_UPDATE});
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteHr = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
