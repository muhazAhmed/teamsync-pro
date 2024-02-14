import express from "express";
const testingRoute = express.Router();
import testingModel from "../models/services/testingModel.js";

testingRoute.get("/", (req, res) => {
  return res.status(200).json("API is Working...");
});

testingRoute.get("/database", async (req, res) => {
  try {
    const response = await testingModel.findOne();
    return res.status(200).json(response.message);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default testingRoute;
