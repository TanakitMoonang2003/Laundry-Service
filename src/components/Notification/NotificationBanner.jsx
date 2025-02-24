import React from 'react';
import { useLaundry } from '../../context/LaundryContext';

const NotificationBanner = () => {
  const { showNotification, currentNotification } = useLaundry();

  if (!showNotification) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 p-4 rounded shadow-lg max-w-md animate-fade-in z-50">
      <div className="flex items-start">
        <div className="mr-2">
          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">LINE แจ้งเตือน!</p>
          <p className="text-sm">{currentNotification}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;