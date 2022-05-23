import { Backdrop, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function BuktiTransaksi({ buktiTransaksi, show, setShow }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={show}
      onClick={() => {
        setShow(false);
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: 20, right: 20 }}
        size={"large"}
        color="inherit"
      >
        <CloseRoundedIcon
          fontSize="large"
          color={grey["100"]}
        ></CloseRoundedIcon>
      </IconButton>
      <img
        style={{ height: "90%" }}
        src={buktiTransaksi}
        alt="bukti transasksi"
      ></img>
    </Backdrop>
  );
}
