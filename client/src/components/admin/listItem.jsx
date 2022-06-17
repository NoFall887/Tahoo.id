import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link, useLocation } from "react-router-dom";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

const listItems = [
  {
    link: "/admin/pesanan",
    icon: <SummarizeRoundedIcon />,
    label: "Pesanan",
  },
  {
    link: "/admin/produk",
    icon: <InventoryIcon />,
    label: "Produk",
  },

  {
    link: "/admin/pendapatan",
    icon: <PaidRoundedIcon />,
    label: "Catatan pendapatan",
  },
];

export default function ListItem() {
  const location = useLocation();
  console.log(location);

  return (
    <React.Fragment>
      {listItems.map((val, index) => {
        return (
          <Link to={val.link} className="sidebar-button" key={index}>
            <ListItemButton
              selected={val.link === location.pathname}
              // onClick={() => setSelectedList(index)}
            >
              <ListItemIcon>{val.icon}</ListItemIcon>
              <ListItemText primary={val.label} />
            </ListItemButton>
          </Link>
        );
      })}
    </React.Fragment>
  );
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
  </React.Fragment>
);
