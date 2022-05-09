import React, { useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";

export default function ConfirmOrder({
  jumlah,
  userId,
  product,
  setShowConfirm,
  setChangeOrder,
}) {
  const [isLoading, setIsLoading] = useState(false);
  function createOrder() {
    setIsLoading(true);
    axios
      .post(
        "http://localhost:5000/add-order",
        {
          jumlah: jumlah,
          userId: userId,
          productId: product.id_produk,
          harga: product.harga,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.success) {
          var message = `[Tahoo.id] saya ingin memesan ${
            product.nama_produk
          } sebanyak ${jumlah}kg dengan total ${product.harga * jumlah}`;
          message = encodeURIComponent(message);
          setIsLoading(false);
          setChangeOrder((prev) => !prev);
          setShowConfirm(false);
          window.open(
            `https://api.whatsapp.com/send?phone=6281334089882&text=${message}`,
            "_blank"
          );
        }
      });
  }

  return (
    <Row>
      <Col className="confirm-order-container shadow ms-3 me-3 p-4">
        <WhatsAppIcon color="success" sx={{ fontSize: 100 }} className="mb-3" />
        <p className="confirm-text-1">Lanjutkan pesanan anda</p>
        <p className="confirm-text-2">
          Lanjutkan pesanan ke <strong>Whatsapp</strong> dengan klik tombol
          lanjutkan, pesanan otomatis disimpan di data pesanan
        </p>
        <div className="confirm-btn-container d-flex">
          <Button variant="danger" onClick={() => setShowConfirm(false)}>
            Batal
          </Button>
          <Button variant="success" onClick={createOrder} disabled={isLoading}>
            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Lanjutkan"
            )}
          </Button>
        </div>
      </Col>
    </Row>
  );
}
