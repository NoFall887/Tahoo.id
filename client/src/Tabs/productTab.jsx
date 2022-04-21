import React, { useState } from 'react'
import ProductDetail from '../components/productDetail'
import Products from '../components/products'

export default function ProductTab() {
  var [selectedProduct, setSelectedProduct] = useState(false)

  return (
    selectedProduct ? <ProductDetail select={setSelectedProduct} product={selectedProduct} />:<Products select={setSelectedProduct}/>
    
  )
}
