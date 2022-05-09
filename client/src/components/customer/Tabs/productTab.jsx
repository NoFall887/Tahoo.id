import React, { useState } from "react";
import ProductDetail from "../products/productDetail";
import Products from "../products/products";

const ProductTab = React.memo(({ user, setChangeOrder }) => {
  const [selectedProduct, setSelectedProduct] = useState(false);

  return selectedProduct ? (
    <ProductDetail
      setChangeOrder={setChangeOrder}
      select={setSelectedProduct}
      product={selectedProduct}
      user={user}
    />
  ) : (
    <Products select={setSelectedProduct} />
  );
});

export default ProductTab;
