import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
const OrderList = () => {
  
  const [orders,setOrders]=useState([])
  const fetch=async()=>{
    const respone = await axios.get('http://localhost:5000/admin/orders')
    console.log(respone)
    if(respone.data.success){
      setOrders(respone.data.orders)
    }
  }
useEffect(()=>{
  fetch()
  
},[])
  const handlePrint=()=>{
    window.print()
  }

  return (
    <div>OrderList
      <button onClick={handlePrint}>Print</button>
      <div>
        {orders.map((order, index) => {
          const totalPrice = order.order.reduce((total, item) => total + item.price * item.quantity, 0);
          return (
            <div key={index} className='order-card'>
              <p>Token: {order.id}</p>
              <div>
                {order.order.map((item, index) => (
                  <div key={index}>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{item.quantity}</p>
                  </div>
                ))}
              </div>
              <p>Total: {totalPrice}</p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default OrderList