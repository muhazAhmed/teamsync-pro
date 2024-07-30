import express from 'express';
const routes = express.Router();
import { fetchAllUsersId, fetchOneUser, loginUser, newUser, updateUser} from "../controllers/User/userController.js"
import { fetchAllRequests, fetchPriorityCounts, updateRequest } from '../controllers/HR/HRController.js';
import { deleteClientData, getAllClientData, getOneClientData, newClientData, updateClientData } from '../controllers/serviceController/ClientController.js';
import { fetchAllUsers, fetchUserByName } from '../controllers/adminController/adminController.js';
import { attendanceDashboardData, fetchAndCheckDaily, fetchAttendanceByIdPageWise, fetchOneAttendance, newAttendance, updateAttendance } from '../controllers/User/attendanceController.js';
import "../controllers/serviceController/cronJobs.js"
import { deleteSupportReq, fetchAllSupportReq, fetchOneSupportReq, newSupportReq, updateSupportReq } from '../controllers/serviceController/SupportController.js';
import { deleteLeaveReq, fetchPendingLeaveReq, newLeaveReq } from '../controllers/User/timeOffController.js';

routes.post("/user/register", newUser)
routes.post("/user/login", loginUser)
routes.patch("/user/update/:id", updateUser)
routes.get("/user/fetch/:id", fetchOneUser)
routes.get("/user/fetch-all-users", fetchAllUsersId)

routes.post("/user/update-request/:id", updateRequest)
routes.get("/user/fetch-all/update-request", fetchAllRequests)
routes.get("/user/fetch-priority/update-request", fetchPriorityCounts)

routes.post("/user/add/attendance/:id", newAttendance)
routes.get("/user/fetch-one/attendance/:id", fetchOneAttendance)
routes.patch("/user/update/attendance/:id", updateAttendance)
routes.get("/user/attendance-stat/:id", attendanceDashboardData)
routes.post("/user/attendance/daily-check/:id", fetchAndCheckDaily)
routes.get("/user/attendance/all/:id", fetchAttendanceByIdPageWise)

routes.get("/users/fetch-all", fetchAllUsers)
routes.get("/users/fetch-by-name", fetchUserByName)

routes.post("/user/new-support-request/:id", newSupportReq)
routes.get("/user/fetch-support-requests", fetchAllSupportReq)
routes.get("/user/fetch-one-support-request/:id", fetchOneSupportReq)
routes.patch("/user/update-support-request/:id", updateSupportReq)
routes.delete("/user/delete-support-request/:id", deleteSupportReq)

routes.post("/client/new-request", newClientData)
routes.get("/client/fetch-request/:id", getOneClientData)
routes.get("/client/fetch-all-request", getAllClientData)
routes.patch("/client/update-request/:id", updateClientData)
routes.delete("/client/-request/:id", deleteClientData)

routes.post("/user/leave-request/new/:id/:role", newLeaveReq)
routes.get("/user/leave-request/fetch-by-status/:id", fetchPendingLeaveReq)
routes.delete("/user/leave-request/delete/:id", deleteLeaveReq)

export default routes;