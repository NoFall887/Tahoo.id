import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import CurrencyText from "../../currencyText";
import axios from "axios";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export default function ProductDetail({
  product,
  select,
  user,
  setChangeCart,
  setActiveKey,
}) {
  const [jumlah, setJumlah] = useState(1);
  const [total, setTotal] = useState(product.harga * jumlah);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function handleChange(value) {
    if (parseInt(value) < 1 || value === "") {
      setJumlah(1);
      return;
    }
    setJumlah(parseInt(value));
    setTotal(product.harga * parseInt(value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(
        `http://localhost:5000/add-cart-item`,
        {
          productId: product.id_produk,
          jumlah: jumlah,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.success) {
          setChangeCart((prev) => !prev);
          setShow(true);
        }
        setIsLoading(false);
      });
  }

  return (
    <Row className="justify-content-around product-detail">
      <Col className="col-4 product-detail-container">
        <img src={product.foto} className="mb-3" alt="profile"></img>
        <p className="product-detail-name">{product.nama_produk}</p>
        <p>{product.deskripsi}</p>
      </Col>
      <Col className="col-5 order-form-container shadow rounded p-4">
        <Form onSubmit={handleSubmit} id="addOrder">
          <div className="harga mb-3">
            <p>Harga (/kg)</p>
            <p>
              <CurrencyText value={product.harga} />
            </p>
          </div>
          <Form.Group className="mb-3" controlId="jumlah">
            <Form.Label>Jumlah</Form.Label>
            <InputGroup>
              <Button
                variant="outline-secondary"
                id="subtract"
                onClick={() => handleChange(jumlah - 1)}
              >
                <RemoveCircleOutlineRoundedIcon />
              </Button>
              <FormControl
                type="number"
                value={jumlah}
                onChange={(e) => handleChange(e.target.value)}
                name="jumlah"
              />
              <Button
                variant="outline-secondary"
                id="add"
                onClick={() => handleChange(jumlah + 1)}
              >
                <AddCircleOutlineRoundedIcon />
              </Button>
            </InputGroup>
          </Form.Group>
          <div className="total">
            <p>Total</p>
            <p>
              <CurrencyText value={total} />
            </p>
          </div>

          <div className="d-flex btn-detail-container">
            <Button variant="outline-danger" onClick={() => select(false)}>
              Kembali
            </Button>
            <Button variant="secondary" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Pesan"
              )}
            </Button>
          </div>
        </Form>
      </Col>
      <Snackbar
        open={show}
        autoHideDuration={3000}
        onClose={() => setShow(false)}
      >
        <Alert onClose={() => setShow(false)} severity="success">
          Ditambahkan ke keranjang!
        </Alert>
      </Snackbar>
    </Row>
  );
}
