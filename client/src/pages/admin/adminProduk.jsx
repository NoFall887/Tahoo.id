import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import AdminLoading from "../../components/admin/adminLoading";
import Admin from "../../components/admin/adminTemplate";
import AdminProducts from "../../components/admin/produk/adminProducts";
export const ProductsContext = createContext({});

export default function AdminProduk() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    function fetchProducts() {
      axios
        .get("/products-admin", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            return setProducts(response.data.data);
          }
        });
    }
    fetchProducts();
  }, []);

  return (
    <Admin>
      {products ? (
        <ProductsContext.Provider value={{ products, setProducts }}>
          <AdminProducts />
        </ProductsContext.Provider>
      ) : (
        <AdminLoading />
      )}
    </Admin>
  );
}
