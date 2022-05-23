import { TableCell, TableRow } from "@mui/material";
import React from "react";
import CurrencyText from "../../currencyText";

export default function OrderItem({ itemData, index }) {
  return (
    <TableRow key={index} sx={{ "& td": { border: "none" } }}>
      <TableCell>
        <img
          src={itemData.foto}
          alt="product"
          style={{ width: "42px", aspectRatio: "1/1", objectFit: "cover" }}
        ></img>
      </TableCell>
      <TableCell>{itemData.nama_produk}</TableCell>
      <TableCell align="right">{itemData.jumlah + " Kg"}</TableCell>

      <TableCell align="right">
        <CurrencyText value={itemData.harga} />
      </TableCell>
      <TableCell align="right">
        <CurrencyText value={itemData.jumlah * itemData.harga} />
      </TableCell>
    </TableRow>
  );
}
