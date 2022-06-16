import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link } from "react-router-dom";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import { SidebarContext } from "../../App";
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
    link: "/admin/pesanan",
    icon: <SummarizeRoundedIcon />,
    label: "Pesanan",
  },
  {
    link: "/admin/pendapatan",
    icon: <PaidRoundedIcon />,
    label: "Catatan pendapatan",
  },
];

export default function ListItem() {
  const { selectedList, setSelectedList } = React.useContext(SidebarContext);
  return (
    <React.Fragment>
      {listItems.map((val, index) => {
        return (
          <Link to={val.link} className="sidebar-button" key={index}>
            <ListItemButton
              selected={selectedList === index}
              onClick={() => setSelectedList(index)}
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

// export const mainListItems = (
//   <React.Fragment>
//     {listItems.map((val, index) => {
//       return (
//         <Link to={val.link} className="sidebar-button" key={index}>
//           <ListItemButton selected={selectedList} >
//             <ListItemIcon>{val.icon}</ListItemIcon>
//             <ListItemText primary={val.label} />
//           </ListItemButton>
//         </Link>
//       );
//     })}
//   </React.Fragment>
// );

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
  </React.Fragment>
);
