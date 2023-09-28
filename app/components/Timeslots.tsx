'use client'

import React from 'react';

const AvailabilityPostings = ({ slots, onSlotClick }) => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <div className="grid grid-cols-2 gap-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="bg-blue-500 p-4 rounded cursor-pointer"
            onClick={() => onSlotClick(slot)}
          >
            {slot}
          </div>
        ))}
      </div>
    </div>
  );
};

const AvailabilityPostingComponent = () => {
  const availabilityPostings = [
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    // Add more time slots as needed
  ];

  const handleSlotClick = (slot) => {
    // alert(`Selected time slot: ${slot}`);
    console.log(slot)
    // Add your custom logic here when a slot is selected
  };

  return (
    <AvailabilityPostings slots={availabilityPostings} onSlotClick={handleSlotClick} />
  );
};

export default AvailabilityPostingComponent;

