import express from 'express';
const routes = express.Router();
import { fetchOneUser, loginUser, newUser, updateRequest, updateUser} from "../controllers/User/userController.js"
import { deleteClientData, getAllClientData, getOneClientData, newClientData, updateClientData } from '../controllers/serviceController/ClientController.js';
import { fetchAllUsers, fetchUserByName } from '../controllers/adminController/adminController.js';

routes.post("/user/register", newUser)
routes.post("/user/login", loginUser)
routes.patch("/user/update/:id/:name", updateUser)
routes.post("/user/update-request/:id", updateRequest)
routes.get("/user/fetch/:id", fetchOneUser)

routes.get("/users/fetch-all", fetchAllUsers)
routes.get("/users/fetch-by-name", fetchUserByName)

routes.post("/client/new-request", newClientData)
routes.get("/client/fetch-request/:id", getOneClientData)
routes.get("/client/fetch-all-request", getAllClientData)
routes.patch("/client/update-request/:id", updateClientData)
routes.delete("/client/-request/:id", deleteClientData)

export default routes;