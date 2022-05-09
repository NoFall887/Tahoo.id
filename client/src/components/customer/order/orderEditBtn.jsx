import React, { useState } from 'react'
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default function OrderEditBtn({onEdit, setOnEdit, jumlah, data}) {
  const [isLoading, setIsLoading] = useState(false)

  function saveChanges() {
    setIsLoading(true)
    axios.put('http://localhost:5000/update-order', {
      jumlah:jumlah,
      orderId:data.id_pesanan
    }, {withCredentials:true})
    .then(response => {
      if(response.data.success) {
        setIsLoading(false)
        setOnEdit(false)
        return
      }
      setIsLoading(false)
      setOnEdit(false)
    })
  }
  if (onEdit) return(
    <Button variant='success' className='order-edit-btn py-1 px-2' onClick={saveChanges} disabled={isLoading}>
      {isLoading ? <Spinner as="span" animation="border" size='sm' role="status" aria-hidden="true" /> : <CheckRoundedIcon/> }
    </Button>
  )
  
  return (
    <Button variant='primary' className='order-edit-btn py-1 px-2' onClick={()=>setOnEdit(true)}>
      <ModeEditOutlineRoundedIcon/>
    </Button>
  )
}
