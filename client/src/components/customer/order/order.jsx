import {
  Alert,
  Collapse,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  Typography,
} from "@mui/material";
import React, { createContext, useState } from "react";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/system";
import { Badge, Button, Spinner } from "react-bootstrap";
import OrderItem from "./orderItem";
import BuktiPembayaranBtn from "./buktiPembayaranBtn";
import ModalCustom from "../../modal";
import CurrencyText from "../../currencyText";
import axios from "axios";

export const orderEditContext = createContext({});
export default function Order({ data, setChangeOrder }) {
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempData, setTempData] = useState([]);
  // console.log(data);
  const total = onEdit ? tempData[0] : data[0];
  data = data.slice(1);

  function handleSubmit() {
    setIsLoading(true);
    axios
      .put(
        "/update-order",
        { data: tempData.slice(1) },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.success) {
          setChangeOrder((prev) => !prev);
          setOnEdit(false);
          setIsLoading(false);
          setAlert(true);
        }
      });
  }

  function setTemp() {
    setTempData([
      parseInt(total),
      ...data.map((val) => {
        return { ...val };
      }),
    ]);
  }

  return (
    <orderEditContext.Provider
      value={{ onEdit, setOnEdit, tempData, setTempData }}
    >
      <Paper elevation={4}>
        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid black",
            alignItems: "center",
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
          <Typography marginLeft={2} variant="body" component={"span"}>
            {data[0].tanggal}
          </Typography>
          {onEdit ? (
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                variant="danger"
                style={{ marginRight: "12px" }}
                disabled={isLoading}
                onClick={() => {
                  setOnEdit(false);
                  // revertChanges();
                }}
              >
                Batal
              </Button>
              <Button
                variant="success"
                disabled={isLoading}
                onClick={handleSubmit}
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
                  "Submit"
                )}
              </Button>
            </Box>
          ) : (
            <Button
              variant="primary"
              disabled={data[0].id_status_pesanan === 1}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginLeft: "auto",
              }}
              onClick={() => {
                setTemp();
                setOnEdit(true);
              }}
            >
              <ModeEditRoundedIcon /> Edit
            </Button>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1">{data.tanggal}</Typography>
            {data[0].id_status_pesanan === 1 ? (
              <Badge bg="success" style={{ height: "fit-content" }}>
                Selesai
              </Badge>
            ) : (
              <Badge bg="warning" style={{ height: "fit-content" }}>
                Menunggu konfirmasi
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
      {show && (
        <ModalCustom head={"Bukti transaksi"} show={show} setShow={setShow}>
          <img
            style={{ width: "100%" }}
            src={data[0].bukti_transaksi}
            alt="bukti transaksi"
          ></img>
        </ModalCustom>
      )}
      <Snackbar
        open={alert}
        autoHideDuration={3000}
        onClose={() => setAlert(false)}
      >
        <Alert onClose={() => setAlert(false)} severity="success">
          Data diubah!
        </Alert>
      </Snackbar>
    </orderEditContext.Provider>
  );
}
