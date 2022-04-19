import { Container, Row, Col } from "react-bootstrap";

export default function AuthContainer(props){
  return(
    <div id="authContainer"  className="d-flex align-items-center">
      <Container fluid>
        <Row className="justify-content-center">
          <Col id="form-container" className="px-5 py-4 shadow m-4">
            {props.children}
          </Col>
        </Row>
      </Container>
    </div>
  )
}