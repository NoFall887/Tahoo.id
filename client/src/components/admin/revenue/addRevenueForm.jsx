import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CurrencyText from "../../currencyText";

export default function AddRevenueForm({ index, products, data, setFormData }) {
  const selected = products.find((val) => val.id_produk === data.produk);
  products = products.map((product) => {
    console.log(product.id_produk === data.produk, data.produk);
    if (product.id_produk === data.produk) {
      let res = { ...product };
      res.selected = false;
      return res;
    }
    return { ...product };
  });

  function handleChange(value) {
    setFormData((formData) => {
      if (parseInt(value) <= 0 || value === "") {
        formData[index].jumlah = 1;
      } else {
        formData[index].jumlah = parseInt(value);
      }
      return [...formData];
    });
  }

  return (
    <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
      <FormControl sx={{ flex: 4 }} required>
        <InputLabel id="select-product-label">Nama produk</InputLabel>

        <Select
          labelId="select-product-label"
          id="select-product"
          value={data.produk}
          label="Nama produk"
          onChange={(e) => {
            setFormData((formData) => {
              formData[index].produk = e.target.value;

              if (formData[formData.length - 1].produk !== "") {
                formData[formData.length - 1].jumlah = 1;
                formData.push({ produk: "", jumlah: 0 });
              } else if (
                formData.length > 1 &&
                formData[index].produk === "" &&
                index !== formData.length - 1
              ) {
                formData.splice(index, 1);
              }

              return [...formData];
            });
          }}
        >
          {products.map((product, i) => {
            console.log(product);
            if (!product.selected) {
              return (
                <MenuItem key={i} value={product.id_produk}>
                  {product.nama_produk}
                </MenuItem>
              );
            }
            return null;
          })}
        </Select>
      </FormControl>

      <TextField
        required
        type={"number"}
        name="nama"
        id="jumlah-produk"
        label="Jumlah produk"
        value={data.jumlah}
        onChange={(e) => handleChange(e.target.value)}
        sx={{ flex: 2 }}
      />
      <Typography sx={{ flex: 2 }} variant="body1" component={"span"}>
        <CurrencyText value={selected.id_produk !== "" ? selected.harga : 0} />
      </Typography>
      <Typography sx={{ flex: 2 }} variant="body1" component={"span"}>
        <CurrencyText
          value={selected.id_produk !== "" ? selected.harga * data.jumlah : 0}
        />
      </Typography>
    </Box>
  );
}
