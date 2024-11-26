import React, { useState } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';

const AdminPage = () => {
  const [selectedItems, setSelectedItems] = useState([]); // Track selected items
  const [biryani, setBiryani] = useState(0);

  const specialItems = [
    { id: 1, name: 'Chicken Biryani', price: 12.99, type: 'Non-Veg', image: 'https://via.placeholder.com/100x100?text=Chicken+Biryani' },
    { id: 2, name: 'Mushroom Biryani', price: 11.49, type: 'Veg', image: 'https://via.placeholder.com/100x100?text=Mushroom+Biryani' },
    { id: 3, name: 'Paneer Tikka', price: 9.99, type: 'Veg', image: 'https://via.placeholder.com/100x100?text=Paneer+Tikka' },
    { id: 4, name: 'Chicken Roast', price: 14.99, type: 'Non-Veg', image: 'https://via.placeholder.com/100x100?text=Chicken+Roast' },
    { id: 5, name: 'Lamb Korma', price: 15.99, type: 'Non-Veg', image: 'https://via.placeholder.com/100x100?text=Lamb+Korma' },
    { id: 6, name: 'Veg Pulao', price: 10.49, type: 'Veg', image: 'https://via.placeholder.com/100x100?text=Veg+Pulao' },
    { id: 7, name: 'Butter Chicken', price: 13.49, type: 'Non-Veg', image: 'https://via.placeholder.com/100x100?text=Butter+Chicken' },
    { id: 8, name: 'Tandoori Chicken', price: 16.49, type: 'Non-Veg', image: 'https://via.placeholder.com/100x100?text=Tandoori+Chicken' },
    { id: 9, name: 'Chole Bhature', price: 8.99, type: 'Veg', image: 'https://via.placeholder.com/100x100?text=Chole+Bhature' },
    { id: 10, name: 'Aloo Paratha', price: 7.49, type: 'Veg', image: 'https://via.placeholder.com/100x100?text=Aloo+Paratha' },
  ];

  const handleSave = () => {
    console.log(selectedItems);
    axios
      .post('http://localhost:5000/admin/add', { items: selectedItems })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
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

  return (
    <>
      <AdminNav />
      <section className="w-full px-4 sm:px-8 py-10 bg-gray-50">
  <div className="max-w-3xl mx-auto border-2 rounded-lg p-6 bg-white shadow-lg mt-20">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Specials</h1>

    {/* Dropdown for selecting items */}
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Select an Item</label>
      <select
        onChange={(event) => {
          const selectedItem = specialItems.find((item) => item.name === event.target.value);
          if (selectedItem) {
            setSelectedItems((prevItems) => [...prevItems, selectedItem]);
          }
        }}
        className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
      <h2 className="text-lg font-bold mb-4 text-gray-800">Selected Items</h2>
      {selectedItems.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {selectedItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center space-x-4 p-4 border rounded-lg bg-gray-100"
            >
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Type: {item.type}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No items selected yet.</p>
      )}
    </div>

    {/* Set Biryani Quantity */}
    <div className="mt-6">
      <label className="block text-gray-700 font-medium mb-2">Set Biryani Quantity</label>
      <input
        type="number"
        name="Biryani"
        className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setBiryani(e.target.value)}
      />
    </div>

    {/* Save Button */}
    <button
      className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
      onClick={handleSave}
    >
      Save
    </button>
  </div>
</section>

    </>
  );
};

export default AdminPage;
