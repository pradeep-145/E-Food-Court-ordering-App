import React, { useState } from 'react';
import AdminNav from './AdminNav';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([
    {
      id: 1,
      items: [
        { id: 1, name: 'Pizza', quantity: 2 },
        { id: 2, name: 'Burger', quantity: 1 },
        { id: 3, name: 'Coke', quantity: 1 },
      ],
      totalPrice: 100,
      createdAt: '2021-09-01T12:34:56.000Z',
    },
    {
      id: 2,
      items: [
        { id: 4, name: 'Pasta', quantity: 1 },
        { id: 5, name: 'Garlic Bread', quantity: 2 },
      ],
      totalPrice: 50,
      createdAt: '2021-09-02T12:34:56.000Z',
    },
  ]);

  return (
    <>
      <AdminNav />
      <div className="max-w-screen-md mx-auto px-4 pt-20">
        <h2 className="text-3xl font-bold text-center mb-6">Order History</h2>
        <div className="overflow-x-auto border-2 rounded-lg">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left text-sm sm:text-base">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Items</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Ordered At</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order, index) => (
                <tr
                  key={order.id}
                  className={`text-sm sm:text-base ${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  }`}
                >
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">
                    <ul className="list-disc pl-5">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.name} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2">${order.totalPrice}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
