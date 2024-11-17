import React from 'react'
import { useState } from 'react'
const OrderHistory = () => {
  const [orders,setOrders]=useState([])
  return (
    <div>
      
      <p>OrderHistory</p>
        <div>
          {orders.map((order,index)=>{
            return(
              <div key={index} className=''>
                <p>{order.date}</p>
                <p>{order.items}</p>
                <p>{order.total}</p>
              </div>
            )


          })
        }
        </div>

    </div>
  )
}

export default OrderHistory