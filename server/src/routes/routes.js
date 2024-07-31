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
import { authenticate } from '../utils/middleware.js';

routes.post("/user/register", newUser)
routes.post("/user/login", loginUser)
routes.patch("/user/update/:id", authenticate, updateUser)
routes.get("/user/fetch/:id", authenticate, fetchOneUser)
routes.get("/user/fetch-all-users", authenticate, fetchAllUsersId)

routes.post("/user/update-request/:id", authenticate, authenticate, updateRequest)
routes.get("/user/fetch-all/update-request", authenticate, authenticate, fetchAllRequests)
routes.get("/user/fetch-priority/update-request", authenticate, authenticate, fetchPriorityCounts)

routes.post("/user/add/attendance/:id", authenticate, newAttendance)
routes.get("/user/fetch-one/attendance/:id", fetchOneAttendance)
routes.patch("/user/update/attendance/:id", updateAttendance)
routes.get("/user/attendance-stat/:id", attendanceDashboardData)
routes.post("/user/attendance/daily-check/:id", fetchAndCheckDaily)
routes.get("/user/attendance/all/:id", fetchAttendanceByIdPageWise)

routes.get("/users/fetch-all", authenticate, fetchAllUsers)
routes.get("/users/fetch-by-name", authenticate, fetchUserByName)

routes.post("/user/new-support-request/:id", authenticate, newSupportReq)
routes.get("/user/fetch-support-requests", authenticate, fetchAllSupportReq)
routes.get("/user/fetch-one-support-request/:id", authenticate, fetchOneSupportReq)
routes.patch("/user/update-support-request/:id", authenticate, updateSupportReq)
routes.delete("/user/delete-support-request/:id", authenticate, deleteSupportReq)

routes.post("/client/new-request", authenticate, newClientData)
routes.get("/client/fetch-request/:id", authenticate, getOneClientData)
routes.get("/client/fetch-all-request", authenticate, getAllClientData)
routes.patch("/client/update-request/:id", authenticate, updateClientData)
routes.delete("/client/-request/:id", authenticate, deleteClientData)

routes.post("/user/leave-request/new/:id/:role", authenticate, newLeaveReq)
routes.get("/user/leave-request/fetch-by-status/:id", authenticate, fetchPendingLeaveReq)
routes.delete("/user/leave-request/delete/:id", authenticate, deleteLeaveReq)

export default routes;