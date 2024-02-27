import express from 'express';
const routes = express.Router();
import {newHr, updateHr, fetchOneHr, loginHr} from "../controllers/HR/hrController.js"

routes.post("/hr/register", newHr)
routes.post("/hr/login", loginHr)
routes.put("/hr/update/:id", updateHr)
routes.get("/hr/fetch/:id", fetchOneHr)

export default routes;