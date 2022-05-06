import { Box, Fab, Grid } from "@mui/material";
import React, { useContext } from "react";
import { ProductsContext } from "../../../pages/admin/adminProduk";
import AdminProduct from "./adminProduct";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
  const navigate = useNavigate();
  const { products } = useContext(ProductsContext);
  return (
    <Box sx={{ minHeight: "80vh", position: "relative" }}>
      <Grid container spacing={3}>
        {products.map((val, index) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <AdminProduct productData={val} />
            </Grid>
          );
        })}
      </Grid>
      <Fab
        size="large"
        color="secondary"
        aria-label="add"
        component="button"
        sx={{ position: "absolute", right: 0, bottom: 0 }}
        onClick={() => navigate("/admin/tambah-produk")}
      >
        <AddRoundedIcon />
      </Fab>
    </Box>
  );
}
