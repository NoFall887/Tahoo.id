import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/system";
import { Badge } from "react-bootstrap";
import OrderItem from "./orderItem";
import BuktiPembayaranBtn from "./buktiPembayaranBtn";
import ModalCustom from "../../modal";
import CurrencyText from "../../currencyText";

export default function Order({ data, setChangeOrder }) {
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(false);
  // console.log(typeof parseInt(data[0]));
  const total = data.slice(0, 1)[0];
  data = data.slice(1);

  console.log(total);
  if (show)
    return (
      <ModalCustom head={"Bukti transaksi"} show={show} setShow={setShow}>
        <img
          style={{ width: "100%" }}
          src={data[0].bukti_transaksi}
          alt="bukti transaksi"
        ></img>
      </ModalCustom>
    );

  return (
    <Paper elevation={4}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid black",
          padding: 2,
        }}
      >
        <Box>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1">{data.tanggal}</Typography>
          {data.bukti_transaksi ? (
            <Badge bg="success" style={{ height: "fit-content" }}>
              Selesai
            </Badge>
          ) : (
            <Badge bg="warning" style={{ height: "fit-content" }}>
              Menunggu pembayaran
            </Badge>
          )}
        </Box>
      </Box>

      <Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Table size="small">
              <TableBody>
                {data.map((val, index) => (
                  <OrderItem itemData={val} key={index} index={index} />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </Box>
      <Box
        sx={{
          borderTop: "1px solid black",
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BuktiPembayaranBtn
          setChangeOrder={setChangeOrder}
          data={data}
          setShow={setShow}
        />
        <Typography variant="h6" component={"p"} color={"#FF7E81"}>
          <CurrencyText value={total} />
        </Typography>
      </Box>
    </Paper>
  );
}
