import React from 'react'
import AuthContainer from '../components/authContainer'
import {Form, Button, FloatingLabel} from "react-bootstrap"
import {Link} from "react-router-dom"

function Register() {
  return (
    <AuthContainer>
      <h1 className="mb-3">Tahoo.Id</h1>
      <p className="mb-4">Registrasi akun</p>
      <Form className="mb-3">
        <FloatingLabel label="Username" className="mb-4" controlId="username">
          <Form.Control type="text" placeholder="Username" required />
        </FloatingLabel>

        <FloatingLabel label="Email" className="mb-4" controlId="email">
          <Form.Control type="text" placeholder="Email" required />
        </FloatingLabel>

        <FloatingLabel label="Password" className="mb-4" controlId="password">
          <Form.Control type="password" placeholder="Password" required />
        </FloatingLabel>

        <FloatingLabel label="Konfirmasi password" className="mb-4" controlId="confirmPassword">
          <Form.Control type="password" placeholder="Konfirmasi password" required />
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