import React from 'react';
import { LaundryProvider } from './context/LaundryContext';
import CustomerManager from './components/Customer/CustomerManager';
import MachineList from './components/LaundryMachine/MachineList';
import NotificationBanner from './components/Notification/NotificationBanner';
import NotificationHistory from './components/Notification/NotificationHistory';
import LineConfigModal from './components/LineConfig/LineConfigModal';
import LineNotification from './components/Notification/LineNotification';

const App = () => {
  return (
    <LaundryProvider>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">ระบบเครื่องซักผ้า</h1>
        
        <LineNotification />
        <CustomerManager />
        <MachineList />
        <NotificationHistory />
        <NotificationBanner />
        <LineConfigModal />
      </div>
    </LaundryProvider>
  );
};

export default App;