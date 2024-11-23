import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../App.css";
import Navbar from '../components/Navbar';
const Hero = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    axios.get('http://localhost:5000/protected/',
    {
      headers:"Authorization: Bearer "+localStorage.getItem('token')

    })
      .then(response => {
        const updatedMenuItems = response.data.map(item => ({ ...item }));
        setMenuItems(updatedMenuItems);
        console.log(menuItems)
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []);
  useEffect(()=>{
    const token=localStorage.getItem('token')
    const username=localStorage.getItem('username')
    if(token){
      axios.get('http://localhost:5000/protected/verify',{
        "headers": {
          'Authorization': `Bearer ${token}`,
        }
      }).then((response)=>{
        if(response.data.message=="Authorized"&&!username){
          localStorage.setItem('username',response.data.username)
        }
      }
      ).catch((error)=>{
        console.error('Error:', error)
        
      }

      )
    }
},[])
  const handleAddToCart = (item) => {
    console.log(item)
    axios.post(
      'http://localhost:5000/protected/cart', 
      {  
        user: localStorage.getItem('username'),
        item: [
          {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }
        ]
      },
      { 
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }
    )
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error('Error:', error);
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
    <>
    <Navbar />

    <div>
      <div>
        <h1 className='text-4xl text-white font-bold font-revellia px-10 pt-24'>
          Today's Specials</h1>
        <div className="grid grid-cols-5 gap-6 px-10 py-8 mt-4">     
          {menuItems.map((item) => (
            <div key={item.id} className="border p-4 bg-orange-500 bg-opacity-50 backdrop-blur-xl rounded-lg hover:border-[#1a759f] shadow-lg hover:shadow-2xl hover:scale-105 duration-300">
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
      <h2 className='text-4xl text-white font-bold font-mono px-10 pt-24'>
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
            {item.quantity&&
            <p>{item.quantity}</p>
            }
            <p className="text-lg mt-2">{item.type}</p>
              <p>Price: ₹{item.price}</p>
              
            <div className="flex items-center justify-between mt-4">
            <button 
              onClick={() => handleAddToCart(item)}
              className="bg-[#43B3AE] hover:bg-black hover:border-[#43B3AE] hover:text-[#43B3AE] text-white border-2 border-gray-400  font-bold py-2 px-4 rounded mt-4 transition duration-200"  >              Add to Cart
            </button>
            <button 
            onClick={()=>handleBuyNow(item)} 
            className="bg-[#43B3AE] hover:bg-black hover:border-[#43B3AE] hover:text-[#43B3AE] text-white border-2 border-gray-400  font-bold py-2 px-4 rounded mt-4 transition duration-200">
              Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    <div className='absolute'>


    </div>
              </>
  );
};

export default Hero;
