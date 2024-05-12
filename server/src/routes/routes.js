import express from 'express';
const routes = express.Router();
import multer from "multer";
import { fetchOneUser, loginUser, newUser, updateUser} from "../controllers/User/userController.js"
import { fetchAllRequests, fetchPriorityCounts, updateRequest } from '../controllers/HR/HRController.js';
import { deleteClientData, getAllClientData, getOneClientData, newClientData, updateClientData } from '../controllers/serviceController/ClientController.js';
import { fetchAllUsers, fetchUserByName } from '../controllers/adminController/adminController.js';

routes.post("/user/register", newUser)
routes.post("/user/login", loginUser)
routes.patch("/user/update/:id", updateUser)
routes.get("/user/fetch/:id", fetchOneUser)

routes.post("/user/update-request/:id", updateRequest)
routes.get("/user/fetch-all/update-request", fetchAllRequests)
routes.get("/user/fetch-priority/update-request", fetchPriorityCounts)

routes.get("/users/fetch-all", fetchAllUsers)
routes.get("/users/fetch-by-name", fetchUserByName)

routes.post("/client/new-request", newClientData)
routes.get("/client/fetch-request/:id", getOneClientData)
routes.get("/client/fetch-all-request", getAllClientData)
routes.patch("/client/update-request/:id", updateClientData)
routes.delete("/client/-request/:id", deleteClientData)

export default routes;