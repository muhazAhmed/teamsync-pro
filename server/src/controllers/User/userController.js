import hrModel from "../../models/HR/hrModel.js";
import employeeModel from "../../models/Employee/employeeModel.js"
import bcrypt from "bcrypt";
import { EmployeeID, GenCompanyEmail, GenJWT, LastLoginWithIP, getUserModelByRole } from "../../utils/helper.js";
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
    console.log(error.message);
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
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
    console.log(error.message);
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
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
    console.log(error.message);
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const fetchOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.query.role;
    const userModel = getUserModelByRole(role);
    const data = await userModel.findById(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const role = req.query.role;
    const userModel = getUserModelByRole(role);
    const existingData = await userModel.findOne({ _id: data._id });

    if (existingData) {
      const updatedRequest = await userModel.findOneAndUpdate(
        { _id: data._id },
        { $set: data },
        { new: true }
      );
      if (updatedRequest) return res.status(200).json({ message: RESPONSE_MESSAGE("").USER_UPDATE })
    } else {
      return res.status(400).json({ message: RESPONSE_MESSAGE("").NO_USER_FOUND })
    }

  } catch (error) {
    console.log(error.message)
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
};

export const fetchAllUsersId = async (req, res) => {
  try {
    const fetchHrs = await hrModel.find({}, '_id')
    const fetchEmployees = await employeeModel.find({}, '_id')
    const hrIds = fetchHrs.map(item => item._id);
    const employeeIds = fetchEmployees.map(item => item._id);
    const AllIds = [...hrIds, ...employeeIds];
    return res.status(200).json(AllIds);
  } catch (error) {
    console.log(error)
    return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
  }
}
