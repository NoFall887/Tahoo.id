import { Box, CssBaseline } from "@mui/material";
import React from "react";
import AdminMain from "./main";
import AdminNavbar from "./navbar";
import Sidebar from "./sidebar";

export const drawerWidth = 240;

export default function Admin({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AdminNavbar />
      <Sidebar />
      <AdminMain>{children}</AdminMain>
    </Box>
  );
}
