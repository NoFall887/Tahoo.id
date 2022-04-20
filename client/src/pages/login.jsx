import AuthContainer from "../components/authContainer";
import {Form, Button, FloatingLabel} from"react-bootstrap"
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react";
import axios from "axios";
// import Home from "./home";

export default function Login({setUser}){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:5000/auth/login', {
      username: username,
      password: password
      
    },{withCredentials:true,}).then(response => {
      if(response.status === 200 && response.data.success === true) {
        setUser(response.data.user)
      }
    })
  }
  return(
    <AuthContainer>
      <h1 className="mb-3">Tahoo.Id</h1>
      <p className="mb-4">Login untuk masuk</p>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <FloatingLabel label="Username" className="mb-4" controlId="username">
          <Form.Control type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} value={username} />
        </FloatingLabel>

        <FloatingLabel label="Password" className="mb-4" controlId="password">
          <Form.Control type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
        </FloatingLabel>
        <Button variant="primary" type="submit" className="rounded-pill py-2 px-5">
          login
        </Button>
      </Form>

      <p>Atau</p>
      <p className="mb-5">Belum memiliki akun? <Link to="/register" className="link-primary">Daftar disini</Link></p>
    </AuthContainer>
  );
};