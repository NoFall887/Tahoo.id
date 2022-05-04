import React, { useState } from 'react'
import ProductDetail from '../components/products/productDetail'
import Products from '../components/products/products'

const ProductTab = React.memo(
  ({user, setChangeOrder}) => {
    const [selectedProduct, setSelectedProduct] = useState(false)
    
    return (
      selectedProduct ? <ProductDetail setChangeOrder={setChangeOrder} select={setSelectedProduct} product={selectedProduct} user={user} />:<Products select={setSelectedProduct}/>
    )
  }
) 

export default ProductTab