import AuthContainer from "../components/authContainer";
import {Col, Container, Row, Form, Button} from"react-bootstrap"
import {Link} from "react-router-dom"
export default function Login(){
  return(
    <AuthContainer>
      <Container fluid>
        <Row className="justify-content-center">
          <Col id="form-container" className="px-5 py-4 shadow m-4">
            <h1 className="mb-3">Tahoo.Id</h1>
            <p className="mb-4">Login untuk masuk</p>
            <Form className="mb-3">
              <Form.Group className="mb-4" controlId="email">
                <Form.Label aria-hidden="true">Email address</Form.Label>
                <Form.Control type="text" placeholder="Username" required />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label aria-hidden="true">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required/>
              </Form.Group>
              <Button variant="primary" type="submit" className="rounded-pill py-2 px-5">
                login
              </Button>
            </Form>

            <p>Atau</p>
            <p className="mb-5">Belum memiliki akun? <Link to="/register" className="link-primary">klik disini</Link></p>
          </Col>
        </Row>
      </Container>
    </AuthContainer>
  );
};