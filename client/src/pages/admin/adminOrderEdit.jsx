import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLoading from "../../components/admin/adminLoading";
import Admin from "../../components/admin/adminTemplate";
import CurrencyText from "../../components/currencyText";
import BuktiTransaksi from "../../components/admin/orders/buktiTransaksi";
import OrderStatus from "../../components/admin/orders/orderStatus";

export default function AdminOrderEdit() {
  const [orderData, setOrderData] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const id = parseInt(useParams().id);
  useEffect(() => {
    function fetchData() {
      axios
        .get(`/admin/get-order-detail/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data.data);
          if (response.data.success) {
            return setOrderData(response.data.data);
          }
        });
    }
    fetchData();
  }, [id]);

  if (orderData === null)
    return (
      <Admin>
        <AdminLoading />
      </Admin>
    );

  const data = orderData.slice(1);
  const date = orderData[1].tanggal;
  const totalOrder = orderData[0];
  const buktiTransaksi = orderData[1].bukti_transaksi;
  return (
    <Admin>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <IconButton size="large" onClick={() => navigate("/admin/pesanan")}>
          <ArrowBackRoundedIcon fontSize="inherit" />
        </IconButton>
        <Typography component={"h2"} variant={"h5"}>
          Detail pesanan
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Box
          p={3}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid black",
          }}
        >
          <Typography variant="body1">ID : {id}</Typography>
          <Typography variant="body1">{date}</Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produk</TableCell>
              <TableCell align="right">Jumlah</TableCell>
              <TableCell align="right">Harga</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.nama_produk}</TableCell>
                  <TableCell align="right">{row.jumlah}</TableCell>
                  <TableCell align="right">
                    <CurrencyText value={row.harga} />
                  </TableCell>
                  <TableCell align="right">
                    <CurrencyText value={row.total} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box
          p={2}
          sx={{
            borderTop: "1px solid black",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {buktiTransaksi ? (
            <Button variant="contained" onClick={() => setShow(true)}>
              Bukti transaksi
            </Button>
          ) : (
            <Button variant="contained" disabled>
              Tidak ada bukti transaksi
            </Button>
          )}
          <Typography variant="h5" fontWeight={600} color={"#FF7E81"}>
            <CurrencyText value={totalOrder} />
          </Typography>
        </Box>
      </TableContainer>
      <OrderStatus id={id} statusData={data[0].id_status_pesanan} />
      <BuktiTransaksi
        buktiTransaksi={buktiTransaksi}
        setShow={setShow}
        show={show}
      />
    </Admin>
  );
}
