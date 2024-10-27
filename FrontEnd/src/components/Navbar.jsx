import { useState } from 'react';
import { Link } from 'react-router-dom';
import kec from '../assets/kec.jpeg';
import { HiOutlineSearch } from 'react-icons/hi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div id='navbar' className='flex items-center justify-between bg-[#bce0ce] bg-opacity-30 font-sans font-semibold backdrop-blur-md px-8 pt-2 fixed w-full h-16 shadow-lg'>
           <div className='flex justify-between'>
             <div className='flex flex-shrink-0 items-center text-5xl font-bold cursor-pointer mt-1'>
                <Link to="/">
                    <img src={kec} width={24} height={24} alt="Logo" />
                </Link>
                <h2 className='text-4xl font-bold font-serif px-10 text-gray-800'>
                    E-Food Court
                </h2>
            </div>
            <div className='mb-5 ml-96'>
            <form className='flex justify-end items-center w-96 mt-5 border border-[#4C7766] rounded-full'>
          <input
            type="text"
            placeholder=" Search"
            className="rounded-full p-2 w-full focus:ring-2 focus:ring-[#4C7766] focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="absolute bg-[#4C7766] text-white px-2 mr-1 rounded-full py-1">
            <HiOutlineSearch className='h-6' />
          </button>
        </form>
            </div>
            </div>

            {isOpen && (
                <div className='lg:flex items-center justify-center gap-2.5 text-xl cursor-pointer flex flex-col absolute top-6 right-0 shadow-lg rounded-2xl py-4 px-7 lg:flex-row bg-blue-500 bg-opacity-30 backdrop-blur-md'>
                    <div>
                        <Link to="/" onClick={() => setIsOpen(false)} className='text-gray-800'>Home</Link>
                    </div>
                    <div>
                        <Link to="/cart" onClick={() => setIsOpen(false)} className='text-gray-800'>Cart</Link>
                    </div>
                    <div>
                        <Link to="/contactUs" onClick={() => setIsOpen(false)} className='text-gray-800'>Contact Us</Link>
                    </div>
                </div>
            )}

            <div className='hidden lg:flex items-center justify-center gap-9 text-xl cursor-pointer'>
                <div>
                    <Link to="/" onClick={() => setIsOpen(false)} className='text-gray-800'>Home</Link>
                </div>
                <div>
                    <Link to="/cart" onClick={() => setIsOpen(false)} className='text-gray-800'>Cart</Link>
                </div>
                <div>
                    <Link to="/contactUs" onClick={() => setIsOpen(false)} className='text-gray-800'>Contact Us</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
