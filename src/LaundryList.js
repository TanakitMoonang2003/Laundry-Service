import React from "react";

export default function LaundryList({ items, removeLaundryItem }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.length === 0 ? (
        <li className="text-gray-500 text-center">🛑 ยังไม่มีรายการ</li>
      ) : (
        items.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-200 p-2 rounded-md text-gray-700 shadow-sm"
          >
            <span>
              {item.category === "เสื้อ" ? "👕" : item.category === "กางเกง" ? "👖" : "🧺"}{" "}
              {item.name} ({item.category})
            </span>
            <button
              onClick={() => removeLaundryItem(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
            >
              ❌ ลบ
            </button>
          </li>
        ))
      )}
    </ul>
  );
}
