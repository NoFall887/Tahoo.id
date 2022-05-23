import { Stack } from "@mui/material";
import React from "react";
import Order from "./order";

export default function Orders({ orderData, setChangeOrder }) {
  return (
    <Stack spacing={2}>
      {orderData.map((val, index) => {
        return <Order data={val} key={index} setChangeOrder={setChangeOrder} />;
      })}
    </Stack>
  );
}
