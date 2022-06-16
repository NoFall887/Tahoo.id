import { Box, Paper } from "@mui/material";

import React from "react";
import Carousel from "react-material-ui-carousel";

const links = [
  "https://i.postimg.cc/L5Q5FX19/Ampas-Tahu-3-width-800.jpg",
  "https://i.postimg.cc/RCgNHPbk/5-Manfaat-Pupuk-Organik-ECO-Farming-yang-Berkualitas1-630x380.jpg",
  "https://i.postimg.cc/bNMr6ZPL/cara-membuat-pupuk-1024x672.jpg",
  "https://i.postimg.cc/52C0DfNJ/jangan-dibuang-ampas-tahu-bisa-dibuat-bisnis-menggiurkan-ini.jpg",
];

export default function HomeCarousel() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
        }}
      >
        <Carousel
          // animation="slide"
          navButtonsAlwaysVisible={true}
          sx={{ overflow: "visible" }}
        >
          {links.map((val, index) => {
            return <Item key={index} item={val} />;
          })}
        </Carousel>
      </Box>
    </Box>
  );
}

function Item({ item }) {
  return (
    <Paper sx={{ overflow: "hidden" }} elevation={8}>
      <img
        src={item}
        alt="f"
        style={{
          objectFit: "cover",
          width: "100%",

          height: "60vh",
        }}
      ></img>
    </Paper>
  );
}
