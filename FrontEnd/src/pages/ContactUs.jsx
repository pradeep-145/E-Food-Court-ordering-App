import React from 'react';
import Navbar from '../components/Navbar';

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="text-white font-bold text-5xl text-center mt-52">Get in touch with us</div>
        <div className="flex flex-col justify-center items-center bg-[#4C7766] text-white bg-opacity-70 backdrop-blur-xl p-10 rounded-xl mt-10">
          <div className="flex flex-col gap-8">
            <h2 className=" font-bold font-serif text-2xl">Email: sakthi@gmail.com</h2>
            <span className=" font-serif font-bold text-2xl">
              <h2>Phone: 1234567890</h2><br/>
              <h2>Address: Kongu Engineering College, Perundurai, Erode, Tamil Nadu</h2>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
