import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../App.css";

const Hero = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/protected/')
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
    <div className='bg-white'>
      <div>
        <h1 className='text-4xl font-bold font-revellia px-10 pt-24'>
          Today's Specials</h1>
        <div className="grid grid-cols-5 gap-6 px-10 py-8 mt-4">     
          {menuItems.map((item) => (
            <div key={item.id} className="border p-4 bg-[#eeeab9] rounded-lg hover:border-[#43B3AE] shadow-lg hover:shadow-2xl hover:scale-105 duration-300">
              <img 
                src={item.image} 
                alt={item.name} 
                className='w-full rounded-lg h-48'           
              />
              <h3 className="text-2xl font-bold mt-4">{item.name}</h3>
              <div className='flex justify-between'>
              <p className="text-xl mt-3">{item.type}</p>
              <p  className="text-2xl mt-3 font-bold">Price: ₹{item.price}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="bg-gray-600 hover:bg-black hover:border-[#43B3AE] hover:text-[#43B3AE] text-white border-2 border-gray-400  font-bold py-2  px-4 rounded mt-4 transition duration-200">
                  Add to Cart
                </button>
                <button onClick={()=>handleBuyNow(item)} className="bg-[#1a759f] hover:bg-black hover:border-[#43B3AE] hover:text-[#43B3AE] text-white border-2 border-gray-400  font-bold py-2 px-4 rounded mt-4 transition duration-200">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
      </div>
      </div>
      <div>
      <h2 className='text-4xl font-bold font-mono px-10 pt-24'>
        Check out our Menu
      </h2>
      <div className="grid grid-cols-5 gap-6 px-10 py-6">
        {menuItems.map((item) => (
          <div key={item.id} className="border p-6 bg-[#F5F5DC] rounded-lg hover:border-[#43B3AE] shadow-lg hover:shadow-2xl hover:scale-105 duration-300">
            <img 
              src={item.image} 
              alt={item.name} 
              className='w-full rounded-lg h-48'           
            />
            <h3 className="text-2xl font-bold mt-4">{item.name}</h3>
            <p className="text-lg mt-2">{item.type}</p>
              <p>Price: ₹{item.price}</p>
              
            <div className="flex items-center justify-between mt-4">
            <button 
              onClick={() => handleAddToCart(item)}
              className="bg-[#43B3AE] hover:bg-black hover:border-[#43B3AE] hover:text-[#43B3AE] text-white border-2 border-gray-400  font-bold py-2 px-4 rounded mt-4 transition duration-200">              Add to Cart
            </button>
            <button onClick={()=>handleBuyNow(item)} className="bg-[#43B3AE] hover:bg-black hover:border-[#43B3AE] hover:text-[#43B3AE] text-white border-2 border-gray-400  font-bold py-2 px-4 rounded mt-4 transition duration-200">
              Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Hero;
