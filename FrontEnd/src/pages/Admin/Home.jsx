import React, { useState } from 'react';

const AdminPage = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [itemDetails, setItemDetails] = useState({
    name: '',
    price: '',
    type: '',
    image: '',
  });

  // Sample special items
  const specialItems = [
    {
      id: 1,
      name: 'Chicken Biryani',
      price: 12.99,
      type: 'Non-Veg',
      image: 'https://via.placeholder.com/100x100?text=Chicken+Biryani',
    },
    {
      id: 2,
      name: 'Mushroom Biryani',
      price: 11.49,
      type: 'Veg',
      image: 'https://via.placeholder.com/100x100?text=Mushroom+Biryani',
    },
    {
      id: 3,
      name: 'Paneer Tikka',
      price: 9.99,
      type: 'Veg',
      image: 'https://via.placeholder.com/100x100?text=Paneer+Tikka',
    },
    {
      id: 4,
      name: 'Chicken Roast',
      price: 14.99,
      type: 'Non-Veg',
      image: 'https://via.placeholder.com/100x100?text=Chicken+Roast',
    },
    {
      id: 5,
      name: 'Lamb Korma',
      price: 15.99,
      type: 'Non-Veg',
      image: 'https://via.placeholder.com/100x100?text=Lamb+Korma',
    },
    {
      id: 6,
      name: 'Veg Pulao',
      price: 10.49,
      type: 'Veg',
      image: 'https://via.placeholder.com/100x100?text=Veg+Pulao',
    },
    {
      id: 7,
      name: 'Butter Chicken',
      price: 13.49,
      type: 'Non-Veg',
      image: 'https://via.placeholder.com/100x100?text=Butter+Chicken',
    },
    {
      id: 8,
      name: 'Tandoori Chicken',
      price: 16.49,
      type: 'Non-Veg',
      image: 'https://via.placeholder.com/100x100?text=Tandoori+Chicken',
    },
    {
      id: 9,
      name: 'Chole Bhature',
      price: 8.99,
      type: 'Veg',
      image: 'https://via.placeholder.com/100x100?text=Chole+Bhature',
    },
    {
      id: 10,
      name: 'Aloo Paratha',
      price: 7.49,
      type: 'Veg',
      image: 'https://via.placeholder.com/100x100?text=Aloo+Paratha',
    },
  ];

  // Handle item selection from dropdown
  const handleItemChange = (event) => {
    const selectedItemId = event.target.value;
    setSelectedItem(selectedItemId);

    // Find the selected item details from the list
    const selectedItemDetails = specialItems.find(item => item.id.toString() === selectedItemId);

    if (selectedItemDetails) {
      setItemDetails({
        name: selectedItemDetails.name,
        price: selectedItemDetails.price,
        type: selectedItemDetails.type,
        image: selectedItemDetails.image,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // You can send the selected item to your backend if necessary
    console.log('Item added:', itemDetails);
  };

  return (
    <div className='pt-20'>
      <h1>Admin - Add Special Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select Special Item:
          <select value={selectedItem} onChange={handleItemChange} required>
            <option value="">Select Item</option>
            {specialItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} - ${item.price} - {item.type}
              </option>
            ))}
          </select>
        </label>
        <br />
        <div>
          <h3>Selected Item Details:</h3>
          <p>Name: {itemDetails.name}</p>
          <p>Price: ${itemDetails.price}</p>
          <p>Type: {itemDetails.type}</p>
          <p>Image: <img src={itemDetails.image} alt={itemDetails.name} width="100" /></p>
        </div>
        <button type="submit">Add Special Item</button>
      </form>

      <h2>Special Items List</h2>
      <ul>
        {specialItems.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Type: {item.type}</p>
            <img src={item.image} alt={item.name} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
