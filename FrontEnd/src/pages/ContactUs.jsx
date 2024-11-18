import React from 'react'
import Navbar from '../components/Navbar'
const ContactUs = () => {
  return (
    <>
     <Navbar/>
    <div>
      <div className='flex flex-row gap-10'>
        <div className='flex flex-col justify-center items-center'>
        <div className='flex justify-center items-center text-white font-bold text-5xl text-center mt-80'> Get in touch with us </div>
        <div className='flex flex-col gap-5'>
          <h2 className='text-white font-bold text-2xl'> Email : sakthi@gmail.com</h2>
            <span className='text-white font-normal text-lg'>
              <h2> Phone : 1234567890</h2>
              <h2> Address : Kongu Engineering College, Perundurai, Erode, Tamil Nadu</h2>
            </span>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ContactUs