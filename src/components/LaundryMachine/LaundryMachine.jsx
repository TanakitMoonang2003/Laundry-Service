import React from 'react';
import { useLaundry } from '../../context/LaundryContext';

const LaundryMachine = ({ machine }) => {
  const { 
    insertCoins, 
    selectedCustomer, 
    coinRequired, 
    formatTime 
  } = useLaundry();

  return (
    <div 
      className={`border rounded-lg p-4 shadow ${
        machine.status === "ว่าง" ? "bg-green-50" : "bg-red-50"
      }`}
    >
      <h3 className="text-lg font-bold mb-2">{machine.name}</h3>
      <div className="space-y-2 mb-4">
        <div>สถานะ: <span className="font-medium">{machine.status}</span></div>
        <div>เวลาที่เหลือ: <span className="font-medium">{formatTime(machine.remainingTime)}</span></div>
        <div>เวลาเริ่มต้น: <span className="font-medium">{machine.initialTime} นาที</span></div>
      </div>
      <button
        onClick={() => insertCoins(machine.id)}
        disabled={machine.status === "ไม่ว่าง" || selectedCustomer?.coins < coinRequired}
        className={`w-full py-2 px-4 rounded font-medium ${
          machine.status === "ไม่ว่าง" || selectedCustomer?.coins < coinRequired
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        ใส่เหรียญ ({coinRequired} เหรียญ)
      </button>
    </div>
  );
};

export default LaundryMachine;