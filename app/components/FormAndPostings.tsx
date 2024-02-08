'use client'
// FormAndPostings.tsx

import React, { useState } from 'react';
import AvailabilityPostingForm from './AvailabilityPostingForm';
import PreviousPostings from './PreviousPostings';
import AppDescription from './AppDescription';

const FormAndPostings: React.FC<{
  currentUser: any;
}> = ({ currentUser }) => {
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
    {/* <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition cursor-pointer sm:m-32 lg:m-32 md:m-32 mt-24"> */}
      {/* <AppDescription /> */}
      <AvailabilityPostingForm
        handleFormSubmit={handleFormSubmit}
        setRequestId={handleSetRequestId} 
        currentUser={currentUser}
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