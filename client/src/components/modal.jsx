import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalCustom({ head, show, setShow, children }) {
  function hideModal() {
    setShow(false);
  }

  return (
    <Modal show={show} onHide={hideModal}>
      <Modal.Header>{head}</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={hideModal}>
          Oke
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
