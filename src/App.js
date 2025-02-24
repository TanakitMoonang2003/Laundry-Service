import React, { useState } from "react";
import LaundryForm from "./LaundryForm";
import LaundryList from "./LaundryList";

export default function App() {
  const [laundryItems, setLaundryItems] = useState([]);

  const addLaundryItem = (item, category) => {
    setLaundryItems([...laundryItems, { name: item, category }]);
  };

  const removeLaundryItem = (index) => {
    setLaundryItems(laundryItems.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">🧺 ระบบร้านซักผ้า</h1>
        <LaundryForm addLaundryItem={addLaundryItem} />
        <LaundryList items={laundryItems} removeLaundryItem={removeLaundryItem} />
      </div>
    </div>
  );
}