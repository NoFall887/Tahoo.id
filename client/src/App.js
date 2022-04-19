
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import React from "react";
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

function App() {
  const [user, setUser] = useState(false)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user? <Login/> : <Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
