import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const [cartItems, setCartItems] = useState([
        
    ]);
    const username=localStorage.getItem('username');
    const token=localStorage.getItem('token');
    const navigate=useNavigate()
    if(token==null){
        navigate('/login')
    }
    
    useEffect(() => {
        if (username) { 
            axios.get(`http://localhost:5000/protected/cart/${username}`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                }
              })
              .then((response) => {
                setCartItems(response.data[0]?.items || []);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
        } else {
            console.warn("Username is missing or undefined.");
        }
    }, [username]);
    
    const handlePayment = async () => {
        try {
          console.log(token)
          const response = await axios.post(
            'http://localhost:5000/protected/create-order', 
            { amount: 80000 }, 
            { 
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            }
          );
          const { id: order_id, amount, currency } = response.data;
          console.log(response.data);
          const options = {
            key: 'rzp_test_KjWqiF0J29xI5A',
            amount: amount, 
            currency: currency,
            name: 'Your Company Name',
            description: 'Test Transaction',
            order_id: order_id,
            handler: async (response) => {
                const verifyResponse = await axios.post(
                    'http://127.0.0.1:5000/protected/verify-payment',
                    {
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                          }
                    }
                  );
                  
              console.log(verifyResponse.data);
    
              if (verifyResponse.data.status === 'success') {
                alert('Payment successful!');
                const order=await axios.post('http://localhost:5000/protected/orderlist', {
                
                    orders:cartItems
                },{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    } ,
                })
                console.log(order)
                if(order.data.success){
                    console.log('Order placed successfully');
                    await axios.delete(`http://localhost:5000/protected/cart-remove/${username}`,{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    navigate('/token')
                    setCartItems([]);
                }
              } else {
                alert('Payment verification failed.');
              }
            },
            prefill: {
              name: 'Test User',
              email: 'testuser@example.com',
              contact: '9999999999',
            },
            theme: {
              color: '#3399cc',
            },
          };
          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } catch (error) {
          console.error('Error in payment process:', error);
        }
    }
    

    const removeFromCart = (index) => {
        const updatedCart = cartItems.filter((item, itemIndex) => itemIndex !== index);
        axios.post('http://localhost:5000/protected/cart/remove',{
            'user':username,
            'item':updatedCart
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
        <>
        <Navbar />
        <div className="max-w-screen-md mx-auto px-2 pt-20">
            <h1 className="text-4xl text-center mt-5 font-bold mb-6 text-black">Your Cart</h1>

            {cartItems.length > 0 ? (
                <div>
                    <div className="bg-[#4C7766] bg-opacity-70 backdrop-blur-xl shadow-md rounded-xl p-8">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between border-b py-4 items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                    <p className="text-black font-semibold">₹{item.price} x {item.quantity}</p>
                                </div>
                                <div className="text-right flex items-center gap-4">
                                    <p className="text-xl font-bold">₹{item.price * item.quantity}</p>
                                    <button 
                                        onClick={() => removeFromCart(index)} 
                                        className="bg-white  text-[#4C7766] font-bold py-1 px-3 rounded-xl">
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
                        <button                                         className="bg-white  text-[#4C7766] font-bold py-1 px-3 rounded-xl
mt-6 w-full" onClick={handlePayment}>
                            Proceed to Payment
                        </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-2xl text-white">Your cart is empty.</p>
            )}
        </div>
                    </>
    );
};

export default Cart;
