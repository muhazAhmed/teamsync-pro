import express from 'express';
const routes = express.Router();
import {newHr, updateHr, fetchOneHr, loginHr} from "../controllers/HR/hrController.js"
import { deleteClientData, getAllClientData, getOneClientData, newClientData, updateClientData } from '../controllers/serviceController/ClientController.js';

routes.post("/hr/register", newHr)
routes.post("/hr/login", loginHr)
routes.patch("/hr/update/:id", updateHr)
routes.get("/hr/fetch/:id", fetchOneHr)

routes.post("/client/new-request", newClientData)
routes.get("/client/fetch-request/:id", getOneClientData)
routes.get("/client/fetch-all-request", getAllClientData)
routes.patch("/client/update-request/:id", updateClientData)
routes.delete("/client/-request/:id", deleteClientData)

export default routes;