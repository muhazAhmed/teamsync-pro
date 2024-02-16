import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import React, { Suspense } from 'react';

const Sidebar = React.lazy(() => import("./components/sidebar/Sidebar"));

const Home = React.lazy(() => import("./pages/root/home/Home"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Sidebar />
        <Suspense fallback={"Loading..."}>
          <Routes>
            {/* Redirect from "/" to "/home" */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />

            {/* Main routes */}
            <Route path="/dashboard/:id" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App;
