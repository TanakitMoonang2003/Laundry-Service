import React from 'react';
import { useLaundry } from '../../context/LaundryContext';

const RechargeForm = () => {
  const { 
    rechargeAmount, 
    setRechargeAmount, 
    rechargeCoins 
  } = useLaundry();

  // Handle recharge amount change
  const handleRechargeAmountChange = (e) => {
    setRechargeAmount(parseInt(e.target.value));
  };

  return (
    <div className="flex-1">
      <label className="block mb-1 font-medium">เติมเหรียญ</label>
      <div className="flex space-x-2">
        <select 
          className="p-2 border rounded flex-1"
          value={rechargeAmount}
          onChange={handleRechargeAmountChange}
        >
          <option value="5">5 เหรียญ</option>
          <option value="10">10 เหรียญ</option>
          <option value="20">20 เหรียญ</option>
          <option value="50">50 เหรียญ</option>
          <option value="100">100 เหรียญ</option>
        </select>
        <button 
          onClick={rechargeCoins}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          เติม
        </button>
      </div>
    </div>
  );
};

export default RechargeForm;