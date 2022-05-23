import React, { useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";

export default function ConfirmOrder({
  product,
  setShowConfirm,
  setChangeOrder,
  setChangeCart,
}) {
  const [isLoading, setIsLoading] = useState(false);

  function handleCheckout() {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/checkout", { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          const data = response.data.data;
          var message = `[Tahoo.id] saya ingin memesan `;
          data.forEach((val) => {
            console.log(val);
            message += `${val.nama} sebanyak ${
              val.jumlah_produk
            }kg dengan total ${val.harga_produk * val.jumlah_produk} \n,`;
          });
          message = encodeURIComponent(message);
          setIsLoading(false);
          setChangeOrder((prev) => !prev);
          setChangeCart((prev) => !prev);
          setShowConfirm(false);
          window.open(
            `https://api.whatsapp.com/send?phone=6281334089882&text=${message}`,
            "_blank"
          );

          return;
        }
        return setIsLoading(false);
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
          <Button
            variant="success"
            onClick={handleCheckout}
            disabled={isLoading}
          >
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
