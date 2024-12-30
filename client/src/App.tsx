import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import "./animation.css";
import React, { Suspense, useEffect } from 'react';
import Loader from "./UI-Components/Loader/Loader";
import { loadPage } from "./utils/onPageLoad";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorBoundary";
import Payroll from "./pages/payroll";

const Sidebar = React.lazy(() => import("./components/sidebar/Sidebar"));
const AuthGuard = React.lazy(() => import("./utils/AuthGuard"));
const HRAuthGuard = React.lazy(() => import("./utils/AuthGuard").then(module => ({ default: module.HRAuthGuard })));
const PageNotFound = React.lazy(() => import("./components/PageNotFound/PageNotFound"));

const Home = React.lazy(() => import("./pages/root/home/Home"));
const About = React.lazy(() => import("./pages/root/about/About"));
const Contact = React.lazy(() => import("./pages/root/contact/Contact"));
const UserForm = React.lazy(() => import("./pages/form/UserForm/UserForm"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const Settings = React.lazy(() => import("./pages/Settings/Settings"));
const Profile = React.lazy(() => import("./pages/profile/Profile"));
const People = React.lazy(() => import("./pages/people/People"));
const HelpDesk = React.lazy(() => import("./pages/help-desk/HelpDesk"));
const Attendance = React.lazy(() => import("./pages/Attendance/AddAttendance/Attendance"));
const ManageAttendance = React.lazy(() => import("./pages/Attendance/ManageAttendance/ManageAttendance"));
const LeaveManagement = React.lazy(() => import("./pages/LeaveManagement/LeaveManagement"));
const Calendar = React.lazy(() => import("./pages/calendar/Calendar"));
const Feeds = React.lazy(() => import("./pages/feeds/Feeds"));
const Loan = React.lazy(() => import("./pages/loans/Loan"));
const Tasks = React.lazy(() => import("./pages/tasks/Tasks"));

// ============================ HR Routes ===================
const UpdateRequest = React.lazy(() => import("./pages/HR/UpdateRequest/UpdateRequest"));

function App() {
  const flag = location.href.includes("home") || location.href.includes("user/form");
  useEffect(() => {
    loadPage();
  }, [])

  return (
    <div className='app'>
      <BrowserRouter>
        <Sidebar />
        <div className="app-container" style={flag ? { marginTop: "0px" } : { marginTop: "80px" }}>
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
            <Suspense fallback={<Loader />}>
              <Routes>
                {/* Redirect from "/" to "/home" */}
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />

                {/* Main routes */}
                <Route path="/user/form" element={<UserForm />} />
                <Route path="/product/about" element={<About />} />
                <Route path="/product/contact" element={<Contact />} />
                <Route path="/dashboard/:id" element={<AuthGuard><Dashboard /></AuthGuard>} />
                <Route path="/help-desk/:id" element={<AuthGuard><HelpDesk /></AuthGuard>} />
                <Route path="/settings/:id" element={<AuthGuard><Settings /></AuthGuard>} />
                <Route path="/user-info/:id" element={<AuthGuard><Profile /></AuthGuard>} />
                <Route path="/people" element={<AuthGuard><People /></AuthGuard>} />
                <Route path="/attendance/new/:id" element={<AuthGuard><Attendance /></AuthGuard>} />
                <Route path="/attendance/manage/:id" element={<AuthGuard><ManageAttendance /></AuthGuard>} />
                <Route path="/time-off/:id" element={<AuthGuard><LeaveManagement /></AuthGuard>} />
                <Route path="/calendar/:id" element={<AuthGuard><Calendar /></AuthGuard>} />
                <Route path="/feeds/:id" element={<AuthGuard><Feeds /></AuthGuard>} />
                <Route path="/loan-management" element={<AuthGuard><Loan /></AuthGuard>} />
                <Route path="/tasks/:id" element={<AuthGuard><Tasks /></AuthGuard>} />
                <Route path="/salary-revision" element={<AuthGuard><Payroll /></AuthGuard>} />

                {/* HR routes */}
                <Route path="/hr/update-request" element={<HRAuthGuard><UpdateRequest /></HRAuthGuard>} />


                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
