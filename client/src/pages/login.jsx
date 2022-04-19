import AuthContainer from "../components/authContainer";
import {Form, Button, FloatingLabel} from"react-bootstrap"
import {Link} from "react-router-dom"

export default function Login(){
  return(
    <AuthContainer>
      <h1 className="mb-3">Tahoo.Id</h1>
      <p className="mb-4">Login untuk masuk</p>
      <Form className="mb-3">
        <FloatingLabel label="Username" className="mb-4" controlId="username">
          <Form.Control type="text" placeholder="Username" required />
        </FloatingLabel>

        <FloatingLabel label="Password" className="mb-4" controlId="password">
          <Form.Control type="password" placeholder="Password" required />
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