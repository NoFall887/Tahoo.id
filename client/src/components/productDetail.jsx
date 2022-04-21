import React, { useState } from 'react'
import {Row, Col, Form, FormControl, InputGroup, Button } from 'react-bootstrap'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

export default function ProductDetail({product, select}) {
  const [jumlah, setJumlah] = useState(1)
  const [total, setTotal] = useState(product.harga * jumlah)

  function handleChange(value) {
    if (parseInt(value) < 1 || value === "") {
      setJumlah(1)
      return
    }
    setJumlah(parseInt(value))
    setTotal(product.harga * parseInt(value))
  }

  return (
    <Row className='justify-content-around product-detail'>

      <Col className='col-4 product-detail-container' >
        <img src={product.foto} className='mb-3'></img>
        <p>{product.nama_produk}</p>
      </Col>
      <Col className='col-5 order-form-container shadow rounded p-4' >
        <Form>
          <div className='harga mb-3'> 
            <p>Harga (/kg)</p>
            <p>Rp. {product.harga}</p>
          </div>
          <Form.Group className='mb-3' controlId='jumlah'>
            <Form.Label>Jumlah</Form.Label>
            <InputGroup>
              <Button variant="outline-primary" id="subtract" onClick={(e) => handleChange(jumlah-1)}>
              <RemoveCircleOutlineRoundedIcon/>
              </Button>
              <FormControl
                type='number'
                value={jumlah}
                onChange={e => handleChange(e.target.value)}
              />
              <Button variant="outline-primary" id="add" onClick={(e) => handleChange(jumlah+1)}>
                <AddCircleOutlineRoundedIcon/>
              </Button>
            </InputGroup>
          </Form.Group>
          <div className='total'>
            <p>Total</p>
            <p>Rp. {total}</p>
          </div>
          
          <div className='d-flex btn-detail-container'>
            <Button variant='outline-danger' onClick={() => select(false)}>Kembali</Button>
            <Button variant='primary'>Pesan</Button>
          </div>
          
        </Form>
      </Col>
    </Row>
  )
}
