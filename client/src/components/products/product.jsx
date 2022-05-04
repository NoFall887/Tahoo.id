import React from 'react'
import { Col } from 'react-bootstrap'

export default function Product({product, select}) {
  function handleItemClick() {
    select(product)
  }

  return (
    <Col className='product-item shadow col-3' onClick={handleItemClick}>
      <div className='product-img-container'>
        <img className='mb-3' src={product.foto} ></img>
      </div>
      
      <p className='product-name'>
        {product.nama_produk}
      </p>
    </Col>
    

  )
}
