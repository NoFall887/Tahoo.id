import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import EmptyOrder from "../order/emptyOrder";
import Orders from "../order/orders";

const OrderTab = React.memo(({ user, changeOrder, setChangeOrder }) => {
  const [orderData, setOrderData] = useState(null);
  console.log(changeOrder);
  useEffect(() => {
    function fetchOrder() {
      console.log("exec");
      axios
        .get(`http://localhost:5000/get-order/${user.id_profile}`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.data);
            setOrderData(response.data.data);
          }
        });
    }

    fetchOrder();
  }, [user.id_profile, changeOrder]);
  if (orderData === null) {
    return <Loading />;
  } else if (orderData.length === 0) {
    console.log("first");
    return <EmptyOrder />;
  }
  return <Orders orderData={orderData} setChangeOrder={setChangeOrder} />;
});

export default OrderTab;
