import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import React, { Suspense } from 'react';

const Home = React.lazy(() => import("./pages/root/home/Home"));

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Suspense fallback={"Loading..."}>
          <Routes>

            {/*============= root ================*/}
            <Route path="/" element={<Home />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
