import React from 'react';
import { useLaundry } from '../../context/LaundryContext';

const LineConfigModal = () => {
  const { isConfigModalOpen, setIsConfigModalOpen, lineToken } = useLaundry();

  if (!isConfigModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">ตั้งค่า LINE Notify</h2>
        <p className="mb-4 text-sm">
          ระบบได้กำหนดค่า LINE Notify Token แล้ว ✅
        </p>
        <p className="bg-gray-100 p-2 rounded text-sm break-all">
          {lineToken ? `Token: ${lineToken}` : 'ยังไม่มีการตั้งค่า Token'}
        </p>
        <div className="flex justify-end mt-4">
          <button 
            onClick={() => setIsConfigModalOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default LineConfigModal;
