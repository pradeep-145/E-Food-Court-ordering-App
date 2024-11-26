import { useState } from 'react';
import { Link } from 'react-router-dom';
// import kec from '../../assets/kec.png';
import { HiOutlineSearch } from 'react-icons/hi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div id='navbar' className='flex items-center justify-between bg-slate-400 bg-opacity-30 font-sans font-semibold backdrop-blur-md px-8 pt-2 fixed w-full h-16 shadow-lg'>
           <div className='flex justify-between'>
             <div className='flex flex-shrink-0 items-center text-5xl font-bold cursor-pointer mt-1'>
                {/* <Link to="/admin">
                    <img src={kec} width={24} height={24} alt="Logo" />
                </Link> */}
                <h2 className='text-4xl font-bold font-serif px-10 text-gray-800'>
                    E-Food Court
                </h2>
            </div>
            </div>

            {isOpen && (
                <div className='lg:flex items-center justify-center gap-2.5 text-xl cursor-pointer flex flex-col absolute top-6 right-0 shadow-lg rounded-2xl py-4 px-7 lg:flex-row bg-blue-500 bg-opacity-30 backdrop-blur-md'>
                    <div>
                        <Link to="/admin" onClick={() => setIsOpen(false)} className='text-gray-800'>Home</Link>
                    </div>
                    <div>
                        <Link to="/orderList" onClick={() => setIsOpen(false)} className='text-gray-800'>Order List</Link>
                    </div>
                    <div>
                        <Link to="/orderHistory" onClick={() => setIsOpen(false)} className='text-gray-800'>Order History</Link>
                    </div>
                </div>
            )}

            <div className='hidden lg:flex items-center justify-center gap-9 text-xl cursor-pointer'>
                <div>
                    <Link to="/admin" onClick={() => setIsOpen(false)} className='text-gray-800 hover:bg-black hover:text-white hover:rounded-full p-2 text-center w-20'>Home</Link>
                </div>
                <div>
                    <Link to="/orderList" onClick={() => setIsOpen(false)} className='text-gray-800  hover:bg-black hover:text-white hover:rounded-full p-2 text-center w-20'>Order List</Link>
                </div>
                <div>
                    <Link to="/orderHistory" onClick={() => setIsOpen(false)} className='text-gray-800  hover:bg-black hover:text-white hover:rounded-full p-2 text-center w-20'>Order History</Link>
                </div>
                <div>
                    <Link to="/adminLogin" onClick={() => {
                        setIsOpen(false)
                        localStorage.removeItem('admin_token')
                        }} className='text-gray-800  hover:bg-red-400 hover:rounded-full p-2 text-center w-20 hover:text-white'>Logout</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
