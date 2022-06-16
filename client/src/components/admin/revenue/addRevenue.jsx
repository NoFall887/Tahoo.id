import axios from "axios";
import { useEffect, useState } from "react";
import Admin from "../adminTemplate";

export default function AddRevenue() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/admin/item-data", { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          return setProducts(response.data.data);
        }
      });
  }, []);
  return <Admin></Admin>;
}
