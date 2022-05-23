import React from "react";
import { Row } from "react-bootstrap";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
export default function EmptyCart() {
  return (
    <Row className="justify-content-center align-items-center empty-cart py-5">
      <RemoveShoppingCartIcon sx={{ fontSize: "120px", color: grey["400"] }} />
      <Typography
        variant="h5"
        component={"p"}
        sx={{ fontWeight: 500, color: grey["400"], textAlign: "center" }}
      >
        Tidak Ada Item
      </Typography>
    </Row>
  );
}
