import { Box, Typography } from "@mui/material";
import React from "react";
import ReportRoundedIcon from "@mui/icons-material/ReportRounded";
import { grey } from "@mui/material/colors";
export default function AdminEmptyOrders() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ReportRoundedIcon
        sx={{ fontSize: "150px", mb: "8px", color: grey["400"] }}
      />
      <Typography
        component={"span"}
        variant={"h5"}
        fontWeight={600}
        color={grey["400"]}
      >
        {" "}
        Tidak ada data transaksi
      </Typography>
    </Box>
  );
}
