import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function AdminLoading() {
  return (
    <Box
      sx={{
        width: "70%",
        height: "80vh",
        margin: "auto",
      }}
    >
      <LinearProgress
        color="secondary"
        sx={{
          position: "relative",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
    </Box>
  );
}
