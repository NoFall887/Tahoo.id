import {
  Box,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, FormControl, InputGroup, Spinner } from "react-bootstrap";
import CurrencyText from "../../currencyText";
import ConfirmOrder from "../cart/confirmOrder";
import EmptyCart from "../cart/emptyCart";
import Loading from "../loading";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import MuiAlert from "@mui/material/Alert";

const CartTab = React.memo(
  ({ user, setChangeOrder, changeCart, setChangeCart }) => {
    const [cart, setCart] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [tempCart, setTempCart] = useState([]);
    const [onEdit, setOnEdit] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const total = useRef(0);

    function handleSubmit() {
      setIsloading(true);
      axios
        .post(
          `http://localhost:5000/update-cart/${cart[0].id_keranjang}`,
          { newData: cart, oldData: tempCart },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.success) {
            setChangeCart((prev) => !prev);
            setOnEdit(false);
            setIsOpen(true);
          }
          setIsloading(false);
        });
    }

    function updateTotal(data) {
      total.current = 0;
      data.forEach((val) => {
        total.current += val.total;
      });
    }

    function setTemp() {
      let temp = [];
      cart.forEach((val) => {
        temp.push(val.jumlah);
      });
      setTempCart(temp);
    }

    function revertChanges() {
      setCart((prevCart) => {
        let temp = [...prevCart];
        temp.forEach((val, index) => {
          val.jumlah = tempCart[index];
          val.total = val.jumlah * val.harga;
        });
        updateTotal(temp);
        return temp;
      });
    }

    function handleChange(value, index) {
      if (parseInt(value) < 1 || value === "") {
        setCart((prevCart) => {
          const data = prevCart[index];
          data.jumlah = 1;
          data.total = data.harga * data.jumlah;
          updateTotal(prevCart);
          const result = [...prevCart];
          return result;
        });
        return;
      }
      setCart((prevCart) => {
        const data = prevCart[index];
        data.jumlah = parseInt(value);
        data.total = data.harga * data.jumlah;

        updateTotal(prevCart);
        const result = [...prevCart];

        return result;
      });
      return;
    }

    useEffect(() => {
      function fetchCart() {
        axios
          .get(`http://localhost:5000/cart`, {
            withCredentials: true,
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response.data.data);
              setCart(response.data.data);
              updateTotal(response.data.data);
            }
          });
      }
      fetchCart();
    }, [changeCart, user.id_profile]);

    if (cart === null) return <Loading />;
    if (cart.length === 0) return <EmptyCart />;
    if (showConfirmation)
      return (
        <ConfirmOrder
          setChangeCart={setChangeCart}
          setShowConfirm={setShowConfirmation}
          setChangeOrder={setChangeOrder}
        />
      );

    return (
      <TableContainer component={Paper}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "end",
            borderBottom: "1px solid black",
          }}
        >
          {onEdit ? (
            <>
              <Button
                variant="danger"
                style={{ marginRight: "12px" }}
                disabled={isLoading}
                onClick={() => {
                  setOnEdit(false);
                  revertChanges();
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
            </>
          ) : (
            <Button
              variant="primary"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
              onClick={() => {
                setOnEdit(true);
                setTemp();
              }}
            >
              <ModeEditRoundedIcon /> Edit
            </Button>
          )}
        </Box>
        <Table sx={{ width: "100%" }} aria-label="cart table">
          <TableBody>
            {cart.map((val, index) => {
              return (
                <TableRow key={index} sx={{ "& td": { fontSize: "16px" } }}>
                  <TableCell>{val.nama_produk}</TableCell>

                  {onEdit ? (
                    <TableCell>
                      <InputGroup size="sm" style={{ width: "fit-content" }}>
                        <Button
                          variant="outline-secondary"
                          id="subtract"
                          onClick={() => handleChange(val.jumlah - 1, index)}
                        >
                          <RemoveCircleOutlineRoundedIcon />
                        </Button>
                        <FormControl
                          style={{ textAlign: "center" }}
                          type="number"
                          value={val.jumlah}
                          onChange={(e) => handleChange(e.target.value, index)}
                          name="jumlah"
                        />
                        <Button
                          variant="outline-secondary"
                          id="add"
                          onClick={() => handleChange(val.jumlah + 1, index)}
                        >
                          <AddCircleOutlineRoundedIcon />
                        </Button>
                      </InputGroup>
                    </TableCell>
                  ) : (
                    <TableCell align="right">{val.jumlah + " Kg"}</TableCell>
                  )}
                  <TableCell align="right">
                    <CurrencyText value={val.harga} />
                  </TableCell>
                  <TableCell align="right">
                    <CurrencyText value={val.total} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "18px 18px",
          }}
        >
          <Button
            variant="secondary"
            style={{ fontWeight: 500, padding: "8px 32px" }}
            onClick={() => setShowConfirmation(true)}
            disabled={onEdit}
          >
            Checkout
          </Button>
          <Box
            sx={{
              "& span": {
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#FF7E81",
              },
            }}
          >
            <CurrencyText value={total.current} />
          </Box>
        </Box>

        <Snackbar
          open={isOpen}
          autoHideDuration={3000}
          onClose={() => setIsOpen(false)}
        >
          <Alert onClose={() => setIsOpen(false)} severity="success">
            Data diubah
          </Alert>
        </Snackbar>
      </TableContainer>
    );
  }
);

export default CartTab;
