import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => {
        // Initialize quantity for each item fetched
        const updatedMenuItems = response.data.map(item => ({ ...item, quantity: 1 }));
        setMenuItems(updatedMenuItems);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  const handleAddToCart = (item) => {
    axios.post('http://localhost:5000/cart', {
      name: item.name,
      price: item.price,
      quantity: item.quantity
    });
  };

  const handleQuantityChange = (id, increment) => {
    const updatedItems = menuItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + increment) };
      }
      return item;
    });
    setMenuItems(updatedItems);
  };

  return (
    <div>
      <h2 className='text-4xl font-bold font-mono px-10 pt-24'>
        Check out our Menu
      </h2>
      <div className="grid grid-cols-5 gap-6 px-10 py-6">
        {menuItems.map((item) => (
          <div key={item.id} className="border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img 
              src={item.image} 
              alt={item.name} 
              className='w-full rounded-lg h-48'           
            />
            <h3 className="text-2xl font-bold mt-4">{item.name}</h3>
            <p className="text-lg mt-2">{item.type}</p>
              <p>Price: ₹{item.price}</p>
              
            <button 
              onClick={() => handleAddToCart(item)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
