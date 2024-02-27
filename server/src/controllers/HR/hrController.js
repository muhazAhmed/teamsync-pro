import hrModel from "../../models/HR/hrModel.js";
import { responseMessage } from "../../utils/constants.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const newHr = async (req, res) => {
  try {
    let data = req.body;
    let { firstName, lastName, email, phone, password, role } = data;

    const fetch = await hrModel.findOne({ email });
    if (fetch) return res.status(400).json("Email Already Exists");

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const result = await hrModel.create(data);
    const token = jwt.sign(
      {
        userId: result._id.toString(),
      },
      process.env.JWT_SECRET
    );

    return res.status(201).json({ result, token, message: responseMessage(role).USER_REGISTER });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const loginHr = async (req, res) => {
  try {
    let data = req.body;
    let { email, password, role } = data;

    if (!email) {
      return res.status(400).json("Please Enter Email Address");
    }

    if (!password) {
      return res.status(400).json("Please Enter Password");
    }

    let getUser = await hrModel.findOne({ email });
    if (!getUser)
      return res.status(401).json("Email or Password is Incorrect.");

    let matchPassword = await bcrypt.compare(password, getUser.password);
    if (!matchPassword)
      return res.status(401).json("Email or Password is Incorrect.");

    //token
    const oneDayInSeconds = 24 * 60 * 60; // 1 day in seconds
    const token = jwt.sign(
      {
        userId: getUser._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: oneDayInSeconds }
    );

    const { newPassword, ...other } = getUser;
    let User = getUser;

    return res.status(200).json({ User, token, message: responseMessage(role).USER_LOGIN })
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
    const data = await hrModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(data);
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
