import React from 'react';
import { useLaundry } from '../../context/LaundryContext';
import RechargeForm from './RechargeForm';

const CustomerManager = () => {
  const { 
    customers, 
    selectedCustomer, 
    setSelectedCustomer 
  } = useLaundry();

  // Handle customer selection
  const handleCustomerChange = (e) => {
    const customerId = parseInt(e.target.value);
    const customer = customers.find(c => c.id === customerId);
    setSelectedCustomer(customer);
  };

  return (
    <div className="mb-6 bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">จัดการลูกค้า</h2>
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">เลือกลูกค้า</label>
          <select 
            className="p-2 border rounded w-full"
            onChange={handleCustomerChange}
            value={selectedCustomer?.id}
          >
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name} - เหรียญ: {customer.coins}
              </option>
            ))}
          </select>
        </div>
        
        <RechargeForm />
      </div>
      <div className="mt-3 font-medium text-center p-2 bg-blue-100 rounded">
        {selectedCustomer?.name} มีเหรียญทั้งหมด: {selectedCustomer?.coins || 0} เหรียญ
      </div>
    </div>
  );
};

export default CustomerManager;