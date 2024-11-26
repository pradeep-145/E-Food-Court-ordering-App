import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import for navigation
import toast, { Toaster } from "react-hot-toast"; // Import for toaster notifications
import "../App.css";
import Navbar from "../components/Navbar";

const Hero = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [special, setSpecial] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState("cart"); // 'cart' or 'buy'
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    axios
      .get("http://localhost:5000/protected/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const updatedMenuItems = response.data.map((item) => ({
          ...item,
          quantity: 1,
        }));
        setMenuItems(updatedMenuItems);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });

    axios
      .get("http://localhost:5000/protected/special", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setSpecial(response.data[0].items);
      })
      .catch((error) => {
        console.error("Error fetching specials:", error);
      });
  }, []);

  const openDialog = (item, mode) => {
    setSelectedItem(item);
    setQuantity(1);
    setDialogMode(mode);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedItem(null);
  };

  const handleAddToCart = () => {
    const updatedItem = { ...selectedItem, quantity };
    axios
      .post(
        "http://localhost:5000/protected/cart",
        {
          user: localStorage.getItem("username"),
          item: [
            {
              id: updatedItem.id,
              name: updatedItem.name,
              price: updatedItem.price,
              quantity: updatedItem.quantity,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Item added to cart:", response.data);
        toast.success(`${updatedItem.name} added to cart!`); // Show success toaster
        closeDialog();
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart."); // Show error toaster
      });
  };

  const handleBuyNow = () => {
    const updatedItem = { ...selectedItem, quantity };

    // Redirect to payment page with item details (you may modify the route as needed)
    navigate("/payment", {
      state: {
        item: updatedItem,
      },
    });
  };

  return (
    <>
      <Navbar />
      {/* Add Toaster Component */}
      <Toaster position="top-right" reverseOrder={false} />

      <div>
        <div>
          <h1 className="text-4xl text-white font-bold font-revellia px-10 pt-24">
            Today's Specials
          </h1>
          <div className="grid grid-cols-5 gap-6 px-10 py-8 mt-4">
            {special.map((item) => (
              <div
                key={item.id}
                className="border p-4 bg-[#eeeab9] rounded-lg hover:border-[#1a759f] shadow-lg hover:shadow-2xl hover:scale-105 duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full rounded-lg h-48"
                />
                <h3 className="text-2xl font-bold mt-4">{item.name}</h3>
                <div className="flex justify-between">
                  <p className="text-xl mt-3">{item.type}</p>
                  <p className="text-2xl mt-3 font-bold">Price: ₹{item.price}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => openDialog(item, "cart")}
                    className="bg-gray-600 hover:bg-black hover:border-[#43B3AE] hover:text-[#43B3AE] text-white border-2 border-gray-400 font-bold py-2 px-4 rounded mt-4 transition duration-200"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => openDialog(item, "buy")}
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4 transition duration-200"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-4xl text-white font-bold font-mono px-10 pt-24">
            Check out our Menu
          </h2>
          <div className="grid grid-cols-5 gap-6 px-10 py-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="border p-6 bg-[#F5F5DC] rounded-lg hover:border-[#43B3AE] shadow-lg hover:shadow-2xl hover:scale-105 duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full rounded-lg h-48"
                />
                <h3 className="text-2xl font-bold mt-4">{item.name}</h3>
                <p className="text-lg mt-2">{item.type}</p>
                <p>Price: ₹{item.price}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => openDialog(item, "cart")}
                    className="bg-gray-600 hover:bg-black hover:border-[#43B3AE] hover:text-[#43B3AE] text-white border-2 border-gray-400 font-bold py-2 px-4 rounded mt-4 transition duration-200"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => openDialog(item, "buy")}
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4 transition duration-200"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {dialogVisible && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {dialogMode === "cart" ? "Add to Cart" : "Buy Now"}
            </h2>
            <p className="mb-2">Item: {selectedItem.name}</p>
            <p className="mb-2">Price: ₹{selectedItem.price}</p>
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-semibold">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                className="border rounded px-2 py-1 w-16"
              />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closeDialog}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
              {dialogMode === "cart" ? (
                <button
                  onClick={handleAddToCart}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  onClick={handleBuyNow}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
