import React from 'react'
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import { grey } from '@mui/material/colors';

export default function EmptyOrder() {
  return (
    <div className='d-flex empty-order justify-content-center align-items-center py-4'>
      <RemoveShoppingCartRoundedIcon sx={{fontSize: 120, color:grey[300]}}/>
      <p>Tidak ada data pesanan!</p>
    </div>
  )
}
