'use client'
// FormAndPostings.tsx

import React, { useState } from 'react';
import AvailabilityPostingForm from './AvailabilityPostingForm';
import PreviousPostings from './PreviousPostings';

const FormAndPostings: React.FC = () => {
  const [availabilityStart, setAvailabilityStart] = useState("");
  const [availabilityEnd, setAvailabilityEnd] = useState("");
  const [duration, setDuration] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]); // Add your exact time slot type here

  const handleFormSubmit = (newAvailabilityStart: string, newAvailabilityEnd: string, newDuration: string, newTimeSlots: any) => {
    setAvailabilityStart(newAvailabilityStart);
    setAvailabilityEnd(newAvailabilityEnd);
    setDuration(newDuration);
    setIsFormSubmitted(true);
    setTimeSlots(newTimeSlots);
  };

  const handleSetRequestId = (id: any) => {
    setRequestId(id);
  };

  return (
    <div>
      <AvailabilityPostingForm
        handleFormSubmit={handleFormSubmit}
        setRequestId={handleSetRequestId}  // <-- Pass the function here
      />
      {isFormSubmitted && requestId && (
        <PreviousPostings
          availabilityStart={availabilityStart}
          availabilityEnd={availabilityEnd}
          duration={duration}
          timeSlots={timeSlots}
          requestId={requestId}  
        />
      )}
    </div>
  );
};

export default FormAndPostings;