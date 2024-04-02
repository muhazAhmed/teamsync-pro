import express from 'express';
const routes = express.Router();
import { updateHr, fetchOneUser, loginUser, newUser} from "../controllers/User/userController.js"
import { deleteClientData, getAllClientData, getOneClientData, newClientData, updateClientData } from '../controllers/serviceController/ClientController.js';
import { fetchAllUsers } from '../controllers/adminController/adminController.js';

routes.post("/user/register", newUser)
routes.post("/user/login", loginUser)
routes.patch("/user/update/:id", updateHr)
routes.get("/user/fetch/:id", fetchOneUser)

routes.get("/users/fetch-all", fetchAllUsers)

routes.post("/client/new-request", newClientData)
routes.get("/client/fetch-request/:id", getOneClientData)
routes.get("/client/fetch-all-request", getAllClientData)
routes.patch("/client/update-request/:id", updateClientData)
routes.delete("/client/-request/:id", deleteClientData)

export default routes;