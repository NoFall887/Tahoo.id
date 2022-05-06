import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProduct({ productData }) {
  const navigate = useNavigate();

  function getDetail() {
    navigate(`/admin/produk/${productData.id_produk}`);
  }

  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <CardMedia
        component="img"
        height="140"
        image={productData.foto}
        alt="product image"
      />
      <CardContent>
        <Typography sx={{ fontSize: 18, fontWeight: 500 }} component="div">
          {productData.nama_produk}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="customRed"
          onClick={getDetail}
        >
          Lihat Detail
        </Button>
      </CardActions>
    </Card>
  );
}
