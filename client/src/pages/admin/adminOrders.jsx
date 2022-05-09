import { Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminLoading from "../../components/admin/adminLoading";
import Admin from "../../components/admin/adminTemplate";
import AdminEmptyOrders from "../../components/admin/orders/adminEmptyOrders";

export default function AdminOrders() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    function fetchOrders() {
      axios
        .get("http://localhost:5000/admin/get-all-orders", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.success) {
            setOrders(response.data.data);
            console.log(response.data.data);
          }
        });
    }
    fetchOrders();
  }, []);
  if (orders === null)
    return (
      <Admin>
        <AdminLoading />
      </Admin>
    );
  if (orders.length === 0)
    return (
      <Admin>
        <AdminEmptyOrders />
      </Admin>
    );

  return (
    <Admin>
      <Paper elevation={3} sx={{ minHeight: "32px" }}></Paper>
    </Admin>
  );
}
