import React, { useState } from "react";

export default function LaundryForm({ addLaundryItem }) {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("เสื้อ"); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    addLaundryItem(input, category);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="เพิ่มรายการซักผ้า..."
        className="border p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mt-2 rounded-md"
      >
        <option value="เสื้อ">👕 เสื้อ</option>
        <option value="กางเกง">👖 กางเกง</option>
        <option value="อื่นๆ">🧺 อื่นๆ</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 mt-2 w-full rounded-md hover:bg-blue-600 transition"
      >
        ➕ เพิ่มรายการ
      </button>
    </form>
  );
}
