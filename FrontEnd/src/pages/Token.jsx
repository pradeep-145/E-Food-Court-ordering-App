import React, { useEffect ,useState} from 'react'
import axios from 'axios'
const Token = () => {
  const [items,setItems]=useState([])
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/userLogin')
    }

    axios.get('http://localhost:5000/protected/token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data.data)
        setItems(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })

  }
  , [])
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6 mt-20">
          <h1 className="text-3xl font-bold text-gray-800">Token</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <p className="text-lg font-semibold text-gray-700">Token:{items.id}</p>
            {items.orders.map((item, index) => {
              // const totalPrice = item.order.reduce(
              //   (total, item) => total + item.price * item.quantity,
              //   0
              // );
              return (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center gap-4">
                    
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold">₹{item.price * item.quantity}</p>
                </div>
              )
            }
            )}
            {/* <p className="mt-4 text-lg font-bold text-gray-900">
              Total: ₹{items.orders.reduce((total, item) => total + item.price * item.quantity, 0)}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Token