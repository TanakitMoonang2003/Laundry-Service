import React, { createContext, useState, useEffect, useContext } from 'react';
import { sendNotification } from '../services/lineNotifyService';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Create context
const LaundryContext = createContext();

// Custom hook to use the context
export const useLaundry = () => useContext(LaundryContext);

export const LaundryProvider = ({ children }) => {
  // Machines state
  const [machines, setMachines] = useState([
    { id: 1, name: "เครื่องซักผ้า 1", status: "ว่าง", remainingTime: 0, initialTime: 0 },
    { id: 2, name: "เครื่องซักผ้า 2", status: "ว่าง", remainingTime: 0, initialTime: 0 },
    { id: 3, name: "เครื่องซักผ้า 3", status: "ว่าง", remainingTime: 0, initialTime: 0 }
  ]);

  // Customers state
  const [customers, setCustomers] = useState([
    { id: 1, name: "ลูกค้า 1", coins: 10 },
    { id: 2, name: "ลูกค้า 2", coins: 10 },
    { id: 3, name: "ลูกค้า 3", coins: 20 }
  ]);

  // Notification states
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState("");
  
  // Line config states
  const [lineToken, setLineToken] = useLocalStorage('lineNotifyToken', '');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  
  // Selected customer and recharge amount
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [rechargeAmount, setRechargeAmount] = useState(10);
  
  // Constants
  const coinRequired = 10;

  // Set initial times for machines
  useEffect(() => {
    const updatedMachines = [...machines];
    updatedMachines[0].initialTime = 2;
    updatedMachines[1].initialTime = 1;
    updatedMachines[2].initialTime = 2;
    setMachines(updatedMachines);
    
    // Check if token exists, if not open config modal
    if (!lineToken) {
      setIsConfigModalOpen(true);
    }
  }, []);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setMachines(prevMachines => {
        const updatedMachines = prevMachines.map(machine => {
          if (machine.status === "ไม่ว่าง" && machine.remainingTime > 0) {
            const newRemainingTime = machine.remainingTime - (1/60);
            
            // Check if machine is about to finish (less than 1 minute)
            if (newRemainingTime <= 1 && machine.remainingTime > 1) {
              const message = `${machine.name} เหลือเวลา 1 นาที`;
              sendLineNotification(message);
            }
            
            // If time is up, reset machine status
            if (newRemainingTime <= 0) {
              const message = `${machine.name} ซักผ้าเสร็จแล้ว!`;
              sendCompletionNotification(message);
              return { ...machine, status: "ว่าง", remainingTime: 0 };
            }
            
            return { ...machine, remainingTime: newRemainingTime };
          }
          return machine;
        });
        return updatedMachines;
      });
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  // Function to show notification in UI
  const showLineNotification = (message) => {
    setCurrentNotification(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  // Function to send notification to LINE
  const sendLineNotification = async (message) => {
    // UI notification
    showLineNotification(message);
    setNotifications(prev => [...prev, message]);
    
    // Send to LINE if token exists
    if (lineToken) {
      await sendNotification(lineToken, message);
    }
  };

  // Function to send completion notification
  const sendCompletionNotification = async (message) => {
    // UI notification
    showLineNotification(message);
    setNotifications(prev => [...prev, message]);
    
    // Send to LINE if token exists
    if (lineToken) {
      await sendNotification(lineToken, message);
    }
  };

  // Function to save LINE token
  const saveLineToken = (token) => {
    setLineToken(token);
    setIsConfigModalOpen(false);
    showLineNotification("ตั้งค่า LINE Notify Token เรียบร้อยแล้ว");
  };

  // Function to insert coins and start machine
  const insertCoins = (machineId) => {
    if (!selectedCustomer) return;

    // Check if customer has enough coins
    if (selectedCustomer.coins < coinRequired) {
      alert("เหรียญไม่พอ");
      return;
    }

    // Check if machine is available
    const machine = machines.find(m => m.id === machineId);
    if (machine.status === "ไม่ว่าง") {
      alert("เครื่องกำลังทำงานอยู่");
      return;
    }

    // Update machine status and time
    setMachines(prevMachines => {
      return prevMachines.map(m => {
        if (m.id === machineId) {
          const message = `${selectedCustomer.name} เริ่มใช้งาน ${m.name}`;
          sendLineNotification(message);
          
          return {
            ...m,
            status: "ไม่ว่าง",
            remainingTime: m.initialTime
          };
        }
        return m;
      });
    });

    // Deduct coins from customer
    setCustomers(prevCustomers => {
      return prevCustomers.map(c => {
        if (c.id === selectedCustomer.id) {
          return { ...c, coins: c.coins - coinRequired };
        }
        return c;
      });
    });

    // Update selected customer
    setSelectedCustomer(prev => ({ ...prev, coins: prev.coins - coinRequired }));
  };

  // Function to add coins to customer
  const rechargeCoins = () => {
    if (!selectedCustomer) return;
    
    setCustomers(prevCustomers => {
      return prevCustomers.map(c => {
        if (c.id === selectedCustomer.id) {
          const message = `${c.name} เติมเหรียญจำนวน ${rechargeAmount} เหรียญ`;
          sendLineNotification(message);
          
          return { ...c, coins: c.coins + rechargeAmount };
        }
        return c;
      });
    });
    
    // Update selected customer
    setSelectedCustomer(prev => ({ ...prev, coins: prev.coins + rechargeAmount }));
  };

  // Format time display
  const formatTime = (minutes) => {
    if (minutes <= 0) return "0:00";
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Provide all state and functions to context
  const value = {
    machines,
    customers,
    selectedCustomer,
    notifications,
    showNotification,
    currentNotification,
    lineToken,
    isConfigModalOpen,
    rechargeAmount,
    coinRequired,
    setSelectedCustomer,
    setRechargeAmount,
    setIsConfigModalOpen,
    saveLineToken,
    insertCoins,
    rechargeCoins,
    formatTime
  };

  return (
    <LaundryContext.Provider value={value}>
      {children}
    </LaundryContext.Provider>
  );
};