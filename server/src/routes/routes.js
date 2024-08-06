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
import { deleteHoliday, fetchAllHolidays, fetchOneHoliday, newHoliday, updateHoliday } from '../controllers/User/holidayController.js';
import { deleteEvent, fetchAllEvents, fetchOneEvents, newEvent, updateEvent } from '../controllers/User/EventController.js';

routes.post("/user/register", newUser)
routes.post("/user/login", loginUser)
routes.patch("/user/update/:id", authenticate, updateUser)
routes.get("/user/fetch/:id", authenticate, fetchOneUser)
routes.get("/user/fetch-all-users", authenticate, fetchAllUsersId)

routes.post("/user/update-request/:id/:role", authenticate, updateRequest)
routes.get("/user/fetch-all/update-request", authenticate, fetchAllRequests)
routes.get("/user/fetch-priority/update-request", authenticate, fetchPriorityCounts)

routes.post("/user/add/attendance/:id", authenticate, newAttendance)
routes.get("/user/fetch-one/attendance/:id", authenticate, fetchOneAttendance)
routes.patch("/user/update/attendance/:id", authenticate, updateAttendance)
routes.get("/user/attendance-stat/:id", authenticate, attendanceDashboardData)
routes.post("/user/attendance/daily-check/:id", authenticate, fetchAndCheckDaily)
routes.get("/user/attendance/all/:id", authenticate, fetchAttendanceByIdPageWise)

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

routes.post("/user/holiday/new", authenticate, newHoliday)
routes.get("/user/holiday/fetch-all", authenticate, fetchAllHolidays)
routes.get("/user/holiday/fetch-one/:id", authenticate, fetchOneHoliday)
routes.patch("/user/holiday/update/:id", authenticate, updateHoliday)
routes.delete("/user/holiday/delete/:id", authenticate, deleteHoliday)

routes.post("/user/event/new", authenticate, newEvent)
routes.get("/user/event/fetch-all", authenticate, fetchAllEvents)
routes.get("/user/event/fetch-one/:id", authenticate, fetchOneEvents)
routes.patch("/user/event/update/:id", authenticate, updateEvent)
routes.delete("/user/event/delete/:id", authenticate, deleteEvent)

export default routes;