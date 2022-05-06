import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Admin from "../adminTemplate";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import axios from "axios";
import AdminLoading from "../adminLoading";
import CurrencyText from "../../currencyText";
import { display } from "@mui/system";

export default function AdminProductDetail() {
  const navigate = useNavigate();
  const id = parseInt(useParams().id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    function fetchProducts() {
      axios
        .get(`http://localhost:5000/products-admin/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            return setProduct(response.data.data);
          }
        });
    }
    fetchProducts();
  }, [id]);

  function edit() {
    navigate(`/admin/produk/${product.id_produk}/edit`);
  }
  console.log(product);
  return (
    <Admin>
      {product ? (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: 1,
          }}
        >
          <IconButton
            aria-label="back"
            size="large"
            onClick={() => navigate("/admin/produk")}
          >
            <ArrowBackRoundedIcon />
          </IconButton>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Box sx={{ overflow: "visible", flex: 2 }}>
              <img
                src={product.foto}
                alt={product.nama_produk}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "7/6",
                  objectFit: "cover",
                  borderRadius: 20,
                }}
              ></img>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 4,
                flex: 4,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h5" component={"h2"}>
                  {product.nama_produk}
                </Typography>
                <Typography variant={"body1"} component={"p"}>
                  {product.deskripsi}
                </Typography>
                <Typography
                  variant={"h5"}
                  fontWeight={500}
                  component={"p"}
                  sx={{ color: "#FF7E81" }}
                >
                  <CurrencyText value={product.harga} />
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="customRed"
                sx={{ width: "fit-content" }}
                endIcon={<ModeEditOutlineRoundedIcon />}
                onClick={edit}
              >
                Edit data produk
              </Button>
            </Box>
          </Box>
        </Paper>
      ) : (
        <AdminLoading />
      )}
    </Admin>
  );
}
