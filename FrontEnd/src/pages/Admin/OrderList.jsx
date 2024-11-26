import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get('http://localhost:5000/admin/orders');
    console.log(response);
    if (response.data.success) {
      setOrders(response.data.orders);
    }
  }
useEffect(()=>{
  fetch()
  
},[])

  const handlePrint=async()=>{
    const currentDateTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const response=await axios.post('http://localhost:5000/admin/add-history',{
      orders,
      time:currentDateTime
    })
    console.log(response.data)
    window.print()
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminNav />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6 mt-20">
          <h1 className="text-3xl font-bold text-gray-800">Order List</h1>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Print Orders
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order, index) => {
            const totalPrice = order.order.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
              >
                <p className="text-lg font-semibold text-gray-700">Token: {order.id}</p>
                <div className="mt-4 space-y-2">
                  {order.order.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="text-gray-700 font-semibold">₹{item.price}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-lg font-bold text-gray-900">
                  Total: ₹{totalPrice}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
