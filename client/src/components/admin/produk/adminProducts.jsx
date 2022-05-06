import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { ProductsContext } from "../../../pages/admin/adminProduk";
import AdminProduct from "./adminProduct";

export default function AdminProducts() {
  const { products } = useContext(ProductsContext);
  return (
    <Grid container spacing={3}>
      {products.map((val, index) => {
        return (
          <Grid item xs={3}>
            <AdminProduct key={index} productData={val} />
          </Grid>
        );
      })}
    </Grid>
  );
}
