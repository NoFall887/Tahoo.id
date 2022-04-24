import React, { useState } from 'react'
import AuthContainer from '../components/authContainer'
import {Form, Button, FloatingLabel} from "react-bootstrap"
import {Link, Navigate, useNavigate} from "react-router-dom"
import axios from 'axios'

function Register({setUser}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passValidation, setPassValidation] = useState("")
  const [email, setEmail] = useState("")
  let navigate = useNavigate()
  function handleSubmit(e){
    e.preventDefault()
    if(password === passValidation){
      axios.post('http://localhost:5000/auth/register', {
        username:username,
        email:email,
        password:password
      }, {withCredentials:true}).then(
        response => {
          if(response.status === 200 && response.data.success === true) {
            console.log(response.data)
            navigate('/login', {state:{"msg": "Registrasi berhasil silahkan login!"}})

          } else if(response.data === "23505") {
            alert("username atau email sudah ada")
          } else{
            alert("something went wrong")
          }
        }
      )
    } else {
      alert("konfirmasi password tidak sesuai")
    }
  }
  
  return (
    <AuthContainer>
      <h1 className="mb-3">Tahoo.Id</h1>
      <p className="mb-4">Registrasi akun</p>

      <Form className="mb-3" onSubmit={handleSubmit}>
        <FloatingLabel label="Username" className="mb-4" controlId="username">
          <Form.Control type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)}/>
        </FloatingLabel>

        <FloatingLabel label="Email" className="mb-4" controlId="email">
          <Form.Control type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)}/>
        </FloatingLabel>

        <FloatingLabel label="Password" className="mb-4" controlId="password">
          <Form.Control type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)}/>
        </FloatingLabel>
        
          <FloatingLabel label="Konfirmasi password" className="mb-4" controlId="confirmPassword">
            <Form.Control type="password" placeholder="Konfirmasi password" required value={passValidation} onChange={e => setPassValidation(e.target.value)}/>
          </FloatingLabel>
          
        <Button variant="primary" type="submit" className="rounded-pill py-2 px-5">
          Registrasi
        </Button>
      </Form>

      <p>Atau</p>
      <p className="mb-2">Sudah memiliki akun? <Link to="/" className="link-primary">Login disini</Link></p>
    </AuthContainer>
  )
}

export default Register