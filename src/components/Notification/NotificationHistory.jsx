import React from 'react';
import { useLaundry } from '../../context/LaundryContext';

const NotificationHistory = () => {
  const { notifications } = useLaundry();

  return (
    <div className="border rounded-lg p-4 bg-yellow-50 mb-6">
      <h2 className="text-lg font-semibold mb-2">ประวัติการแจ้งเตือน LINE</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">ยังไม่มีการแจ้งเตือน</p>
      ) : (
        <div className="max-h-60 overflow-y-auto">
          <ul className="space-y-1">
            {notifications.map((notification, index) => (
              <li key={index} className="text-sm border-b border-yellow-100 pb-1 mb-1">
                {notification} <span className="text-gray-500 text-xs">({new Date().toLocaleTimeString()})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationHistory;