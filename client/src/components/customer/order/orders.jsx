import React from 'react'
import Order from './order';
export default function Orders({orderData, setChangeOrder}) {
  return (
    <div className='d-grid gap-3'>
      {orderData.map((val, index) => {
        return <Order data={val} key={index} setChangeOrder={setChangeOrder} />
      })}
    </div>
  )
}
