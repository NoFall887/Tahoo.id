import React, { useState } from 'react'
import {Row, Col, Form, FormControl, InputGroup, Button} from 'react-bootstrap'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import ConfirmOrder from '../order/confirmOrder';
import CurrencyText from '../currencyText';

export default function ProductDetail({product, select, user, setChangeOrder, setActiveKey}) {
  const [jumlah, setJumlah] = useState(1)
  const [total, setTotal] = useState(product.harga * jumlah)
  const [showConfirm, setShowConfirm] = useState(false)
  
  function handleChange(value) {
    if (parseInt(value) < 1 || value === "") {
      setJumlah(1)
      return
    }
    setJumlah(parseInt(value))
    setTotal(product.harga * parseInt(value))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setShowConfirm(true)
    
  }

  if(showConfirm) return <ConfirmOrder setAvtiveKey={setActiveKey} setChangeOrder={setChangeOrder} setShowConfirm={setShowConfirm} userId={user.id_profile} product={product} jumlah={jumlah} />

  return (
    <Row className='justify-content-around product-detail'>

      <Col className='col-4 product-detail-container' >
        <img src={product.foto} className='mb-3' alt='profile'></img>
        <p className='product-detail-name'>{product.nama_produk}</p>
        <p>{product.deskripsi}</p>
      </Col>
      <Col className='col-5 order-form-container shadow rounded p-4' >
        <Form onSubmit={handleSubmit} id='addOrder'>
          <div className='harga mb-3'> 
            <p>Harga (/kg)</p>
            <p><CurrencyText value={product.harga} /></p>
          </div>
          <Form.Group className='mb-3' controlId='jumlah'>
            <Form.Label>Jumlah</Form.Label>
            <InputGroup>
              <Button variant="outline-secondary" id="subtract" onClick={() => handleChange(jumlah-1)}>
              <RemoveCircleOutlineRoundedIcon/>
              </Button>
              <FormControl
                type='number'
                value={jumlah}
                onChange={e => handleChange(e.target.value)}
                name='jumlah'
              />
              <Button variant="outline-secondary" id="add" onClick={() => handleChange(jumlah+1)}>
                <AddCircleOutlineRoundedIcon/>
              </Button>
            </InputGroup>
          </Form.Group>
          <div className='total'>
            <p>Total</p>
            <p><CurrencyText value={total}/></p>
          </div>
          
          <div className='d-flex btn-detail-container'>
            <Button variant='outline-danger' onClick={() => select(false)}>Kembali</Button>
            <Button variant='secondary' type="submit" >
              Pesan
            </Button>
          </div>
          
        </Form>
      </Col>
    </Row>
  )
}
