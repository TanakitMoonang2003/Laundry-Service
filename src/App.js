import React, { useState } from "react";
import LaundryForm from "./LaundryForm";
import LaundryList from "./LaundryList";
import "./index.css"; 

export default function App() {
  const [laundryItems, setLaundryItems] = useState([]);

  const addLaundryItem = (item, category) => {
    setLaundryItems([...laundryItems, { name: item, category }]);
  };

  const removeLaundryItem = (index) => {
    setLaundryItems(laundryItems.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>🧺 ระบบร้านซักผ้า</h1>
      <LaundryForm addLaundryItem={addLaundryItem} />
      <LaundryList items={laundryItems} removeLaundryItem={removeLaundryItem} />
    </div>
  );
}
