import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [selectedItems, setSelectedItems] = useState([]); // Track selected items
  const [biryani, setBiryani] = useState(0);
   // No need to track `selectedItems` in useEffect

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
      axios.post('http://localhost:5000/admin/add',{
        selectedItems
    }).then((response)=>{
        console.log(response);
    }
    ).catch((err)=>{
        console.log(err);
    }
      )

      axios.put('http://localhost:5000/protected/',{
        'quantity':biryani
      }).then((response)=>{
          console.log(response);
      }
      ).catch((err)=>{
          console.log(err);
      }
      )
  }
  return (
    <>
      <section className="w-screen h-screen p-20 px-40">
        <div className="border-2 w-full h-full rounded-lg p-4">
          <select onChange={(item)=>{
             const selectedItem = specialItems.find((item) => item.name === event.target.value);
             if (selectedItem) {
               setSelectedItems((prevItems) => [...prevItems, selectedItem]);
          }}} className="p-2 border rounded-md">
            <option value="">Select an item</option>
            {specialItems.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <div className="mt-4 border-2 rounded-lg p-4">
            <h2 className="text-lg font-bold">Selected Items</h2>
            {selectedItems.length > 0 ? (
              <ul className="mt-2">
                {selectedItems.map((item) => (
                  <li key={item.id} className="flex items-center space-x-4 mb-2">
                    <img src={item.image} alt={item.name} className="w-16 h-16" />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm">Price: ${item.price.toFixed(2)}</p>
                      <p className="text-sm">Type: {item.type}</p>
                    </div>
                    
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items selected yet.</p>
            )}
          </div>
          <div>
            <p> set Biryani quantity :</p>
            <input type="number" name="Biryani" id="" className='border-2 'n onChange={(e)=>setBiryani(e.target.value)}/>
          </div>
          <button className='border-2 p-5 px-7 rounded-full' onClick={handleSave}> save </button>
        </div>
      </section>
    </>
  );
};

export default AdminPage;
