import { Box, Fab, IconButton, Paper, Stack, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Admin from "../adminTemplate";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import axios from "axios";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LoadingButton from "@mui/lab/LoadingButton";
const emptyImage =
  "https://res.cloudinary.com/dgmknbm2h/image/upload/v1651854660/placeholder_large_oemjda.jpg";

export default function AddProduct() {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [profileImage, setProfileImage] = useState(emptyImage);
  const [isLoading, setIsLoading] = useState(false);
  const [harga, setHarga] = useState(1);
  var imgIsChange = useRef(false);

  function handleChange(value) {
    if (parseInt(value) < 1 || value === "") {
      setHarga(1);
      return;
    }
    setHarga(parseInt(value));
  }

  function handleImgUpload(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    var fileUrl = reader.readAsDataURL(file);

    reader.onloadend = function () {
      imgIsChange.current = true;
      setProfileImage(reader.result);
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formElem = document.getElementById("product-add");
    const formData = new FormData(formElem);

    formData.append("imgIsChange", imgIsChange.current);

    setIsLoading(true);
    axios
      .post(`/add-product`, formData, {
        headers: { "content-type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data);
        if (response.data.success === true) {
          setIsLoading(false);
          navigate(`/admin/produk/${response.data.data.id_produk}`);
        }
      })
      .catch((err) => setIsLoading(false));
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
          onClick={() => navigate(`/admin/produk/`)}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
        <form
          style={{ display: "flex", gap: 32, width: "100%" }}
          id="product-add"
          onSubmit={handleSubmit}
        >
          <Box sx={{ overflow: "visible", flex: 2, position: "relative" }}>
            <label
              style={{
                position: "absolute",
                top: "-16px",
                right: "-16px",
              }}
              htmlFor="contained-button-file"
            >
              <input
                required
                accept="image/*"
                id="contained-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={handleImgUpload}
                name="product-img-input"
              />

              <Fab
                size="large"
                color="secondary"
                aria-label="add"
                component="span"
              >
                <ModeEditOutlineRoundedIcon />
              </Fab>
            </label>
            <img
              src={profileImage}
              alt={"product"}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "7/6",
                objectFit: "cover",
                borderRadius: 24,
              }}
            ></img>
          </Box>

          <Box
            sx={{
              flex: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 4,
            }}
          >
            <Stack spacing={3}>
              <TextField
                required
                name="nama"
                id="nama-produk"
                label="Nama produk"
                value={nama}
                fullWidth
                onChange={(e) => setNama(e.target.value)}
              />

              <TextField
                required
                fullWidth
                id="deskripsi-produk"
                label="Deskripsi"
                value={deskripsi}
                placeholder="Deskripsi"
                multiline
                name="deskripsi"
                onChange={(e) => setDeskripsi(e.target.value)}
              />
              <TextField
                required
                fullWidth
                id="harga-produk"
                label="Harga"
                value={harga}
                placeholder="Harga"
                multiline
                name="harga"
                type={"number"}
                onChange={(e) => handleChange(e.target.value)}
              />
            </Stack>

            <LoadingButton
              loading={isLoading}
              endIcon={<CheckRoundedIcon />}
              variant="contained"
              type="submit"
              color="success"
            >
              Submit
            </LoadingButton>
          </Box>
        </form>
      </Paper>
    </Admin>
  );
}
