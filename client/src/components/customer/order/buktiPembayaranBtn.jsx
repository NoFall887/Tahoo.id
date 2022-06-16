import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { orderEditContext } from "./order";

export default function BuktiPembayaranBtn({ data, setChangeOrder, setShow }) {
  const [isLoading, setIsLoading] = useState(false);
  const { onEdit } = useContext(orderEditContext);
  function handleImgUpload(e) {
    var file = e.target.files[0];
    const formData = new FormData();
    formData.append("imgIsChange", true);
    formData.append("bukti-transaksi", file);
    formData.append("orderId", data[0].id_pesanan);
    setIsLoading(true);
    axios
      .post("/bukti-transaksi", formData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          setChangeOrder((prev) => !prev);
        }
      });
  }

  if (data[0].bukti_transaksi === null) {
    return (
      <label
        className={
          "btn btn-secondary order-proof-btn" +
          (isLoading || onEdit ? " disabled" : "")
        }
      >
        <input
          type="file"
          name="bukti-transaksi"
          id="bukti-transaksi"
          onChange={handleImgUpload}
          accept="image/*"
          disabled={isLoading}
        />
        {isLoading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          "Tambah bukti transaksi"
        )}
      </label>
    );
  }

  return (
    <Button
      variant="secondary"
      onClick={() => setShow(true)}
      className="py-2 order-proof-btn"
      disabled={onEdit}
    >
      Tampilkan bukti transaksi
    </Button>
  );
}
