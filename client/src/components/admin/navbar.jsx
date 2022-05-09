import React, { useContext, useState } from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  styled,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { drawerWidth } from "./adminTemplate";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserContext } from "../../App";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AdminNavbar() {
  const { open, setOpen } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  function handleLogout() {
    setLoading(true);
    axios
      .post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
      .then((response) => {
        if (response.data.success === true) {
          setUser(false);
          setAnchorElUser(null);
          setLoading(false);
          navigate("/login");
        }
      });
  }
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={loading}
      >
        <Stack spacing={1} alignItems="center">
          <CircularProgress color="inherit" />
          <Typography variant="body" color={"white"} component={"p"}>
            Logging out...
          </Typography>
        </Stack>
      </Backdrop>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h4"
            fontWeight={700}
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link
              style={{
                color: "black",
                textDecoration: "none",
              }}
              to={"/admin"}
            >
              Tahoo.id
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile Menu">
              <IconButton
                onClick={(e) => setAnchorElUser(e.currentTarget)}
                sx={{ p: 0 }}
              >
                {user && <Avatar alt="User profile" src={user.foto} />}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="account-menu"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={(e) => setAnchorElUser(null)}
            >
              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
                to={"/admin/profile"}
              >
                <MenuItem onClick={() => setAnchorElUser(null)}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
