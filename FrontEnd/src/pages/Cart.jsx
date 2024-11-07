import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Cart = () => {
    const [cartItems, setCartItems] = useState([
        
    ]);
    const username=localStorage.getItem('username');
    const token=localStorage.getItem('token');
    if(token==null){
        window.location.href='/login';
    }
    
    useEffect(() => {
        if (username) { 
            axios.get(`http://localhost:5000/protected/cart/${username}`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                }
              })
              .then((response) => {
                setCartItems(response.data[0]?.items || []); // Fallback to empty array if no items
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
        } else {
            console.warn("Username is missing or undefined.");
        }
    }, [username]);
    
    

    const removeFromCart = (index) => {
        const updatedCart = cartItems.filter((item, itemIndex) => itemIndex !== index);
        axios.post('http://localhost:5000/protected/cart',{
            'username':username,
            'items':updatedCart
        },{
            "headers": {
                'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{
            console.log(response);

        }
        ).catch((err)=>{
            console.log(err);
        }
        )

        setCartItems(updatedCart);
    };

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="max-w-screen-md mx-auto px-2 pt-20">
            <h1 className="text-4xl text-center mt-5 font-bold mb-6">Your Cart</h1>

            {cartItems.length > 0 ? (
                <div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between border-b py-4 items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                    <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                                </div>
                                <div className="text-right flex items-center gap-4">
                                    <p className="text-xl font-bold">₹{item.price * item.quantity}</p>
                                    <button 
                                        onClick={() => removeFromCart(index)} 
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-between mt-4">
                            <h2 className="text-2xl font-bold">Total:</h2>
                            <p className="text-2xl font-bold">₹{totalPrice}</p>
                        </div>
                        <div className='flex w-48 ml-60 '>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-6 w-full">
                            Proceed to Payment
                        </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-lg text-gray-500">Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
