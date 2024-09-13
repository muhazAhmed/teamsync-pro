import express from "express";
const app = express();
import cors from "cors";
const PORT = process.env.PORT || 8800;
import dotenv from "dotenv";
import { DB } from "./utils/db.js";
import testingRoute from "./routes/testingRoute.js";
import route from "./routes/routes.js";
import { createServer } from "http";
import { initializeSocket } from "./utils/socket.js";

app.use(cors());
app.use(express.json());
dotenv.config();
DB(process.env.DB);
app.use("/", testingRoute)
app.use("/api", route)

const httpServer = createServer(app);
initializeSocket(httpServer);

httpServer.listen(PORT, () => console.log("Server Connected to " + PORT+ " ✅"));
