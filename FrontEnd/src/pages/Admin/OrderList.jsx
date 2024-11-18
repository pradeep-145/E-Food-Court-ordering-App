import React from 'react'
import { useState } from 'react'
const OrderList = () => {
  
  const [orders,setOrders]=useState([])

  const handlePrint=()=>{
    window.print()
  }

  return (
    <div>OrderList
      <button onClick={handlePrint}>Print</button>
      <div>
        {orders.map((order,index)=>{
          return(
            <div key={index} className=''>
              <p>{order.date}</p>
              <p>{order.items}</p>
              <p>{order.total}</p>
            </div>
          )})}
      </div>

    </div>
  )
}

export default OrderList