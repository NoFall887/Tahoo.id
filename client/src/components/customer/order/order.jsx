import React, { useState } from "react";
import { Badge, Button, Image } from "react-bootstrap";

import CurrencyText from "../../currencyText";
import BuktiPembayaranBtn from "./buktiPembayaranBtn";
import ModalCustom from "../../modal";
import OrderEditBtn from "./orderEditBtn";
import FieldJumlahBarang from "./fieldJumlahBarang";

export default function Order({ data, setChangeOrder }) {
  const [show, setShow] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [jumlah, setJumlah] = useState(data.jumlah_pesanan);

  return (
    <div className="shadow rounded d-grid gap-2 p-4">
      <div className="d-flex order-item align-items-center">
        <Image src={data.foto} className="order-item-img"></Image>
        <div className="order-text-container">
          <p>{data.nama_produk}</p>
          <FieldJumlahBarang
            jumlah={jumlah}
            onEdit={onEdit}
            setJumlah={setJumlah}
          />
        </div>
        {data.status_pesanan === "selesai" ? (
          <Badge className="py-2" bg="success">
            Selesai
          </Badge>
        ) : (
          <Badge className="py-2" bg="warning">
            Menunggu pembayaran
          </Badge>
        )}
        <OrderEditBtn
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          jumlah={jumlah}
          data={data}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="total-text">
          <p>Total belanja</p>
          <CurrencyText value={data.total} />
        </div>
        <BuktiPembayaranBtn
          setShow={setShow}
          data={data}
          setChangeOrder={setChangeOrder}
        />
      </div>

      {/* IMG DISPLAY */}
      <ModalCustom show={show} setShow={setShow} head={"bukti pembayaran"}>
        <Image src={data.bukti_transaksi} className="transaction-img"></Image>
      </ModalCustom>
    </div>
  );
}
