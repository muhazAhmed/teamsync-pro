import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import "./animation.css";
import React, { Suspense } from 'react';
import Loader from "./UI-Components/Loader/Loader";
import AuthGuard from "./utils/AuthGaurd";

const Sidebar = React.lazy(() => import("./components/sidebar/Sidebar"));

const Home = React.lazy(() => import("./pages/root/home/Home"));
const UserForm = React.lazy(() => import("./pages/form/UserForm/UserForm"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Sidebar />
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Redirect from "/" to "/home" */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />

            {/* Main routes */}
            <Route path="/user/form" element={<UserForm />} />
            <Route path="/dashboard/:id" element={<AuthGuard><Dashboard /></AuthGuard>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App;
