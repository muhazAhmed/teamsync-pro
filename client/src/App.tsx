import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import "./animation.css";
import React, { Suspense } from 'react';
import Loader from "./UI-Components/Loader/Loader";
import AuthGuard from "./utils/AuthGuard";

const Sidebar = React.lazy(() => import("./components/sidebar/Sidebar"));

const Home = React.lazy(() => import("./pages/root/home/Home"));
const UserForm = React.lazy(() => import("./pages/form/UserForm/UserForm"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const Profile = React.lazy(() => import("./pages/profile/Profile"));
const HelpDesk = React.lazy(() => import("./pages/help-desk/HelpDesk"));

function App() {
  const flag = location.href.includes("home") || location.href.includes("user/form");

  return (
    <div className='app'>
      <BrowserRouter>
         <Sidebar />
        <div className="app-container" style={flag ? {marginTop: "0px"} : {marginTop: "80px"}}>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Redirect from "/" to "/home" */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />

            {/* Main routes */}
            <Route path="/user/form" element={<UserForm />} />
            <Route path="/dashboard/:id" element={<AuthGuard><Dashboard /></AuthGuard>} />
            <Route path="/help-desk/:id" element={<AuthGuard><HelpDesk /></AuthGuard>} />
            <Route path="/user-info/:id" element={<AuthGuard><Profile /></AuthGuard>} />
          </Routes>
        </Suspense>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
