import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link } from "react-router-dom";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
const listItems = [
  {
    link: "/admin",
    icon: <DashboardIcon />,
    label: "Dashboard",
  },
  {
    link: "/admin/produk",
    icon: <InventoryIcon />,
    label: "Produk",
  },
  {
    link: "/admin/transaksi",
    icon: <SummarizeRoundedIcon />,
    label: "Transaksi",
  },
];

export const mainListItems = (
  <React.Fragment>
    {listItems.map((val, index) => {
      return (
        <Link to={val.link} className="sidebar-button" key={index}>
          <ListItemButton>
            <ListItemIcon>{val.icon}</ListItemIcon>
            <ListItemText primary={val.label} />
          </ListItemButton>
        </Link>
      );
    })}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
  </React.Fragment>
);
