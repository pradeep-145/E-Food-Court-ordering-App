import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

import Navbar from './AdminNav'; // Importing the Navbar

const AdminPage = () => {
  const [selectedItems, setSelectedItems] = useState([]); // Track selected items
  const [biryani, setBiryani] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const specialItems = [
    // ... (your specialItems array remains unchanged)
  ];

  useEffect(() => {
    // Simulate a loading delay to fetch data (if any)
    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleSave = () => {
    toast.loading('Saving...', { id: 'saveToast' }); // Show a loading toast

    axios
      .post('http://localhost:5000/admin/add', { items: selectedItems })
      .then((response) => {
        console.log(response);
        toast.success('Items saved successfully!', {
          id: 'saveToast', // Dismiss loading toast
          style: { background: 'white', color: '#4C7766' }, // Red "hot" style
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to save items!', {
          id: 'saveToast',
          style: { background: 'white', color: '#4C7766' },
        });
      });

    axios
      .put(
        'http://localhost:5000/protected/',
        { quantity: biryani },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F0F4F1]">
        <div className="text-2xl font-bold text-[#4C7766]">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Toaster /> {/* Add Toaster for toast notifications */}
      <Navbar /> {/* Use the Navbar here */}
      <div className="w-full px-4 sm:px-8 py-10 bg-[#F0F4F1] pt-24">
        <div className="max-w-3xl mx-auto border-2 rounded-lg p-6 bg-white shadow-lg mt-20">
          <h1 className="text-2xl font-bold text-[#4C7766] mb-6">Manage Specials</h1>

          {/* Dropdown for selecting items */}
          <div className="mb-4">
            <label className="block text-[#4C7766] font-medium mb-2">Select an Item</label>
            <select
              onChange={(event) => {
                const selectedItem = specialItems.find((item) => item.name === event.target.value);
                if (selectedItem) {
                  setSelectedItems((prevItems) => [...prevItems, selectedItem]);
                }
              }}
              className="w-full p-2 border rounded-md text-[#4C7766] focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select an item</option>
              {specialItems.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Display selected items */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4 text-[#4C7766]">Selected Items</h2>
            {selectedItems.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg bg-[#F0F4F1]"
                  >
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
                    <div>
                      <h3 className="font-semibold text-[#4C7766]">{item.name}</h3>
                      <p className="text-sm text-[#4C7766]">Price: ${item.price.toFixed(2)}</p>
                      <p className="text-sm text-[#4C7766]">Type: {item.type}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[#4C7766]">No items selected yet.</p>
            )}
          </div>

          {/* Set Biryani Quantity */}
          <div className="mt-6">
            <label className="block text-[#4C7766] font-medium mb-2">Set Biryani Quantity</label>
            <input
              type="number"
              name="Biryani"
              className="w-full p-2 border rounded-md text-[#4C7766] focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setBiryani(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <button
            className="w-full mt-6 bg-[#4C7766] text-white py-2 rounded-md font-semibold hover:bg-[#4C7766] hover:bg-opacity-80 transition duration-300"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
