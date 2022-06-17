import LoadingButton from "@mui/lab/LoadingButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CurrencyText from "../../currencyText";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

export default function RevenueEdit({ data, open, setOpen, renderGrid }) {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    data.harga = data.total / data.jumlah;
    setFormData(data);
  }, [data]);

  console.log(formData);
  function handleChange(value) {
    setFormData((formData) => {
      if (parseInt(value) < 0 || value === "") {
        formData.jumlah = 0;
      } else {
        formData.jumlah = parseInt(value);
      }
      return { ...formData };
    });
  }

  function handleSubmit() {
    setIsLoading(true);
    axios
      .put("/admin/revenue", formData, { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          setOpen(false);
          renderGrid();
        }
      });
  }

  return (
    <Dialog
      disableEscapeKeyDown
      open={open}
      onClose={() => setOpen((val) => !val)}
    >
      <DialogTitle>Edit data</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
        >
          <Typography
            component={"span"}
            variant="body1"
            sx={{ marginBottom: 2 }}
          >
            {formData.nama_produk}
          </Typography>
          <TextField
            type={"number"}
            id="jumlah-input"
            label="Jumlah"
            required
            variant="outlined"
            value={formData.jumlah}
            onChange={(e) => handleChange(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Typography component={"span"} variant="body1">
            <CurrencyText
              value={formData.harga * formData.jumlah}
            ></CurrencyText>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit}
          endIcon={<CheckRoundedIcon />}
          type="submit"
          color="success"
          disabled={formData.length === 0}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
