import AuthContainer from "../components/authentication/authContainer";
import {Form, Button, FloatingLabel, Spinner} from"react-bootstrap"
import {Link} from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import ModalCustom from "../components/modal";

export default function Login({setUser}){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    axios.post('http://localhost:5000/auth/login', {
      username: username,
      password: password
      
    },{withCredentials:true,}).then(response => {
      console.log(response)
      if(response.data.success === true) {
        
        setIsLoading(false)
        setUser(response.data.user)
        return
      }else {
        setShow(true)
        setIsLoading(false)
      }
      
    }).catch(err => {
      console.log(err)
      setShow(true)
      setIsLoading(false)
    })
  }

  return(
    <AuthContainer>
      <ModalCustom head={"Login gagal"} show={show} setShow={setShow}>
        Silahkan cek username dan password anda
      </ModalCustom>
      <h1 className="mb-3">Tahoo.Id</h1>
      
      <p className="mb-4">Login untuk masuk</p>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <FloatingLabel label="Username" className="mb-4" controlId="username">
          <Form.Control type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} value={username} />
        </FloatingLabel>

        <FloatingLabel label="Password" className="mb-4" controlId="password">
          <Form.Control type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
        </FloatingLabel>
        <Button variant="primary" type="submit" className="rounded-pill py-2 px-5" disabled={isLoading}>
          {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Login" }
        </Button>
      </Form>

      <p>Atau</p>
      <p className="mb-5">Belum memiliki akun? <Link to="/register" className="link-primary">Daftar disini</Link></p>
    </AuthContainer>
  );
};