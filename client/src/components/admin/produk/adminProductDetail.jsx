import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Admin from "../adminTemplate";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";

export default function AdminProductDetail() {
  const navigate = useNavigate();
  const data = useLocation().state.productData;
  function edit() {
    navigate(`/admin/produk/${data.id_produk}/edit`, {
      state: { data: data },
    });
  }
  return (
    <Admin>
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
          <Box sx={{ borderRadius: 4, overflow: "hidden" }}>
            <img
              src={data.foto}
              alt={data.nama_produk}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "7/6",
                objectFit: "cover",
              }}
            ></img>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h5" component={"h2"}>
                {data.nama_produk}
              </Typography>
              <Typography variant={"body1"} component={"p"}>
                {data.deskripsi}
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
    </Admin>
  );
}
