import LoadingButton from "@mui/lab/LoadingButton";
import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CurrencyText from "../../currencyText";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRevenueSubmit({ formData, products }) {
  console.log(formData, products);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function handleSubmit() {
    setIsLoading(true);
    axios
      .post("/admin/revenue", { formData }, { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          navigate("/admin/pendapatan");
        }
      });
  }

  function getTotal() {
    let total = 0;
    formData.forEach((val) => {
      let product = products.find((prod) => {
        return prod.id_produk === val.produk;
      });

      total += product.harga * val.jumlah;
    });
    return total;
  }
  return (
    <Paper
      sx={{
        p: 2,
        marginTop: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <LoadingButton
        loading={isLoading}
        onClick={handleSubmit}
        endIcon={<CheckRoundedIcon />}
        variant="contained"
        type="submit"
        color="success"
        disabled={formData.length === 0}
      >
        Submit
      </LoadingButton>

      <Typography>
        <Typography
          sx={{ flex: 2 }}
          variant="h6"
          component={"span"}
          color={"#FF7E81"}
        >
          <CurrencyText value={formData.length === 0 ? 0 : getTotal()} />
        </Typography>
      </Typography>
    </Paper>
  );
}
