
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";
import React from "react";
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import axios from 'axios';
import '/node_modules/bootstrap/dist/js/bootstrap.min.js'
function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    function verify() {
      axios.get('http://localhost:5000/auth/authVerify', {withCredentials:true})
      .then((response) => {
        if(response.data.success == true) {
          return setUser(response.data.user)
        } else {
          return setUser(false)
        }
      }).catch(err => setUser(false))
    }
    verify();
  }, [])

  if(user === null) {
    return <div></div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user? <Home user={user} setUser={setUser} /> : <Navigate to={"/login"}/>} />
        <Route path='/login' element={user?  <Navigate to={"/"} replace={true}/>: <Login setUser={setUser} />}/>
        <Route path='/register' element={user? <Navigate to={"/"} replace={true}/>:<Register setUser={setUser} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
