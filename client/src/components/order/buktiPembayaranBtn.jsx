import axios from 'axios'
import React, { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'

export default function BuktiPembayaranBtn({data, setChangeOrder, setShow}) {
  const [isLoading, setIsLoading] = useState(false)
  

  function handleImgUpload(e) {
    var file = e.target.files[0]
    const formData = new FormData()
    formData.append("imgIsChange", true)
    formData.append("bukti-transaksi", file)
    formData.append("orderId", data.id_pesanan)
    setIsLoading(true)
    axios.post('http://localhost:5000/bukti-transaksi', formData, {withCredentials:true})
    .then(response => {
      if(response.data.success) {
        data.bukti_transaksi = "val"
        setIsLoading(false)
        setChangeOrder(prev => !prev)
      }
    })
  }


  if(data.bukti_transaksi === null) {
    return (
      <label className={'btn btn-secondary order-proof-btn'+ (isLoading?' disabled':'')}>
        <input type='file' name='bukti-transaksi' id='bukti-transaksi' onChange={handleImgUpload} accept='image/*' disabled={isLoading}/>
        {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Tambah bukti transaksi" }
      </label>
    )
  }

  return (
    <Button variant='secondary' onClick={()=>setShow(true)} className='py-2 order-proof-btn' >
        Tampilkan bukti transaksi
    </Button>
  )
}
