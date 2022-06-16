import { Box, CssBaseline } from "@mui/material";
import React from "react";
import AdminMain from "./main";
import AdminNavbar from "./navbar";
import Sidebar from "./sidebar";

export const drawerWidth = 240;

export default function Admin({ children, sx }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", ...sx }}>
      <CssBaseline />
      <AdminNavbar />
      <Sidebar />
      <AdminMain>{children}</AdminMain>
    </Box>
  );
}
