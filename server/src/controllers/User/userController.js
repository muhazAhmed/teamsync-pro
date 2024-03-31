import hrModel from "../../models/HR/hrModel.js";
import employeeModel from "../../models/Employee/employeeModel.js"
import bcrypt from "bcrypt";
import { EmployeeID, GenCompanyEmail, GenJWT, LastLoginWithIP } from "../../utils/helper.js";
import { EMAIL_EXISTS, PASSWORD_INCORRECT, REQUIRE_FIELD, RESPONSE_MESSAGE } from "../../utils/validations.js";

const createUser = async (req, res, userModel) => {
  const data = req.body;
  const { firstName, lastName, email, employeeID, companyEmail, location, phone, password, role } = data;

  try {
    const fetch = await userModel.findOne({ email });
    if (fetch) return res.status(400).json(EMAIL_EXISTS());

    const fetchLastEmpId = await userModel.find({});
    data.employeeID = fetchLastEmpId.length === 0 ? EmployeeID("new", role) : EmployeeID("add", role, fetchLastEmpId[0]);

    const fetchCompanyEmail = await userModel.findOne({ companyEmail });
    if (!fetchCompanyEmail) data.companyEmail = GenCompanyEmail(firstName, phone);

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    data.lastLogin = LastLoginWithIP(req);

    const result = await userModel.create(data);

    const token = GenJWT(result);

    return res.status(201).json({ result, token, message: RESPONSE_MESSAGE(role).USER_REGISTER });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const newUser = async (req, res) => {
  try {
    let userModel;
    const role = req.body.role;

    switch (role.toLowerCase()) {
      case 'hr':
        userModel = hrModel;
        break;
      case 'admin':
        userModel = adminModel;
        break;
      case 'employee':
        userModel = employeeModel;
        break;
      default:
        return res.status(400).json({ message: 'Invalid role specified' });
    }

    await createUser(req, res, userModel);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { companyEmail, password, role } = req.body;

    if (!companyEmail) {
      return res.status(400).json(REQUIRE_FIELD("Email"));
    }

    if (!password) {
      return res.status(400).json(REQUIRE_FIELD("Password"));
    }

    let userModel;
    switch (role.toLowerCase()) {
      case 'hr':
        userModel = hrModel;
        break;
      case 'admin':
        userModel = adminModel;
        break;
      case 'employee':
        userModel = employeeModel;
        break;
      default:
        return res.status(400).json({ message: 'Invalid role specified' });
    }

    const user = await userModel.findOne({ companyEmail });
    if (!user) {
      return res.status(401).json(PASSWORD_INCORRECT());
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json(PASSWORD_INCORRECT());
    }

    const token = GenJWT(user);

    const lastLogin = LastLoginWithIP(req);
    await userModel.findOneAndUpdate(
      { companyEmail },
      { $set: { lastLogin } },
      { new: true }
    );

    const { password: userPassword, ...userData } = user;

    return res.status(200).json({ user, token, message: RESPONSE_MESSAGE(role).USER_LOGIN })
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const fetchOneHr = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.query.role;
    let userModel;
    switch (role) {
      case 'hr':
        userModel = hrModel;
        break;
      case 'admin':
        userModel = adminModel;
        break;
      case 'employee':
        userModel = employeeModel;
        break;
      default:
        return res.status(400).json({ message: 'Invalid role specified' });
    }
    const data = await userModel.findById(id);
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
    return res.status(200).json({ updatedData, message: RESPONSE_MESSAGE("HR").USER_UPDATE });
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