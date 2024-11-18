import React from 'react'
import { useEffect, useState } from 'react';
import  axios from 'axios';
const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/admin/orderHistory')
      .then((response) => {
        setOrderHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <div className="max-w-screen-md mx-auto px-2 pt-20">
        <h2 className="text-3xl font-bold text-center">Order History</h2>
        <div className="mt-4 border-2 rounded-lg p-4">
          <table className="w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Price</th>
                <th>Ordered At</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.id}>{item.name} x {item.quantity}</li>
                      ))}
                    </ul>
                  </td>
                  <td>${order.totalPrice}</td>
                  <td>{order.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default OrderHistory