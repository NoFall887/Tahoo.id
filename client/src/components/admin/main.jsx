import { styled } from "@mui/material/styles";
import React, { useContext } from "react";
import { UserContext } from "../../App";
import DrawerHeader from "./drawerHeader";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export default function AdminMain({ children }) {
  const { open } = useContext(UserContext);

  return (
    <Main open={open}>
      <DrawerHeader />
      {children}
    </Main>
  );
}
