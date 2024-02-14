import express from "express";
const app = express();
import cors from "cors";
const PORT = process.env.PORT || 8800;
import dotenv from "dotenv";
import { DB } from "./utils/db.js";
import testingRoute from "./routes/testingRoute.js";

app.use(cors());
app.use(express.json());
dotenv.config();
DB(process.env.DB);
app.use("/", testingRoute)

app.listen(PORT, () => console.log("Server Connected to " + PORT));
