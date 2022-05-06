import { styled } from "@mui/material";
import React from 'react'

const DrawerHeaderComp = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function DrawerHeader({children}) {
  return (
    <DrawerHeaderComp>
      {children}
    </DrawerHeaderComp>
  )
}
