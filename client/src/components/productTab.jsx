import React, { useState } from 'react'
import ProductDetail from './productDetail'
import Products from './products'

export default function ProductTab() {
  var [selectedProduct, setSelectedProduct] = useState(false)

  return (
    selectedProduct ? <ProductDetail select={setSelectedProduct} product={selectedProduct} />:<Products select={setSelectedProduct}/>
    
  )
}
