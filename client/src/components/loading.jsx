import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        gap: 1,
      }}
    >
      <CircularProgress size={50} />
      <Typography component={"span"} variant={"body1"}>
        Loading...
      </Typography>
    </Box>
  );
}
