import React from 'react';
import { useLaundry } from '../../context/LaundryContext';

const LineNotification = () => {
  const { lineToken, setIsConfigModalOpen } = useLaundry();

  // Open LINE Notify settings modal
  const openLineSettings = () => {
    setIsConfigModalOpen(true);
  };

  return (
    <div className="mb-4 flex justify-between items-center">
      <div>
        <span className={`mr-2 inline-block w-3 h-3 rounded-full ${lineToken ? 'bg-green-500' : 'bg-red-500'}`}></span>
        <span>{lineToken ? "LINE Notify: เชื่อมต่อแล้ว" : "LINE Notify: ไม่ได้เชื่อมต่อ"}</span>
      </div>
      <button 
        onClick={openLineSettings}
        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm"
      >
        ตั้งค่า LINE Notify
      </button>
    </div>
  );
};

export default LineNotification;