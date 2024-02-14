import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import React, { Suspense } from 'react';
import Sidebar from "./components/sidebar/Sidebar";
import Toolbar from "./components/toolbar/Toolbar";

const Home = React.lazy(() => import("./pages/root/home/Home"));

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
      <Sidebar/>
      <div className="body">
        <Toolbar/>
        <Suspense fallback={"Loading..."}>
          <Routes>

            {/*============= root ================*/}
            <Route path="/" element={<Home />} />

          </Routes>
        </Suspense>
      </div>
      
      </BrowserRouter>
    </div>
  )
}

export default App
