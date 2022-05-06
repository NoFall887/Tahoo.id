import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import Product from "./product";
import Loading from "../loading";

export default function Products({ select }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    function fetchProducts() {
      axios
        .get("http://localhost:5000/products", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setProducts(response.data);
        });
    }
    fetchProducts();
  }, []);

  if (products === null) return <Loading />;

  return (
    <Row className="products">
      {products.map((value, index) => {
        console.log(value);
        return <Product product={value} select={select} key={index} />;
      })}
    </Row>
  );
}
