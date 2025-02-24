import React from 'react';
import { useLaundry } from '../../context/LaundryContext';
import LaundryMachine from './LaundryMachine';

const MachineList = () => {
  const { machines } = useLaundry();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {machines.map(machine => (
        <LaundryMachine key={machine.id} machine={machine} />
      ))}
    </div>
  );
};

export default MachineList;