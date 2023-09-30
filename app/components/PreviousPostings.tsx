'use client'
// PreviousPostings.tsx

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface TimeSlot {
  requestId: string | number;
  uuid: string;
  startTime: string;
  endTime: string;
  claimedUserPhoneNumber: string | null;
}

interface TimeSlotsTableProps {
  availabilityStart: string;
  availabilityEnd: string;
  duration: string;
  requestId: string | number;
  timeSlots: TimeSlot[];
}

const TimeSlotsTable: React.FC<TimeSlotsTableProps> = ({ 
  availabilityStart, 
  availabilityEnd, 
  duration, 
  requestId, 
  timeSlots: initialTimeSlots 
}) => {
  // console.log('XSIXTH');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialTimeSlots);
  useEffect(() => {
    console.log('PreviousPostings: ', Math.floor(Date.now() / 1000));
    const socketURL = process.env.NODE_ENV === 'production' ? process.env.URL : 'http://localhost:4000';
    const socket = io(socketURL || 'http://localhost:4000');
    // const socket = io('http://localhost:4000');
    // console.log('ZERO');
    socket.on('new-message', (message: { slotId: number, claimedName: string, phoneNumber: string }) => {
      // console.log('XFIRST');
      setTimeSlots(prevSlots => {
        const index = prevSlots.findIndex(slot => slot.requestId === message.slotId); // Changed from `slot.uuid` to `slot.requestId`
        // console.log('XSECOND');
        console.log('index: ', index);
        if (index !== -1) {
          // console.log('XTHIRD');
          const updatedSlot = { ...prevSlots[index], claimedUserPhoneNumber: message.phoneNumber };
          const newSlots = [...prevSlots];
          newSlots[index] = updatedSlot;
          return newSlots;
        }
        // console.log('XEIGHTH');
        return prevSlots;
      });
    });
    // console.log('XFOURTH');
    return () => {
      socket.disconnect();
    };
  }, []);

  function convertUTCtoEST(utcTimestamp: string): string {
    const utcDate = new Date(utcTimestamp);
    const estOptions: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Los_Angeles',
      hour12: true,
      weekday: 'short', // will output the short name of the weekday e.g., "Sun"
      month: 'short',   // will output the abbreviated name of the month e.g., "Feb"
      day: 'numeric',   // will output the day of the month as a number e.g., 28
      hour: 'numeric',  // will output the hour
      minute: '2-digit' // will output the minute, always as two digits
    };
  
    // Convert to desired format
    let formatted = utcDate.toLocaleString('en-US', estOptions);
    formatted = formatted.replace(',', ''); // remove commas
    formatted = formatted.replace(/\s+/, ' '); // remove extra spaces
    formatted = formatted.replace(' ', ' '); // ensure single space between date and time
    formatted = formatted.replace('AM', 'am').replace('PM', 'pm'); // convert AM/PM to am/pm
    return formatted;
  }

  return (
    <div className="border rounded-md shadow-sm hover:shadow-md transition cursor-pointer sm:mx-32 lg:mx-32 md:mx-32 mt-12">
      <h2 className="text-center py-2 bg-[#f4f4f4]">Slots: {new Date().toLocaleDateString()}: {availabilityStart} to {availabilityEnd} (ID: {requestId})</h2>
      <table className="min-w-full table-auto">
        <thead className="bg-[#0115fc]">
          <tr>
            <th className="py-2 px-2 text-center text-white">Slot #</th>
            <th className="py-2 px-2 text-center text-white">Start</th>
            <th className="py-2 px-2 text-center text-white">End</th>
            <th className="py-2 px-2 text-center text-white">Claimed By</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-[#e1e3f7]' : 'bg-white'}>
              <td className="py-2 px-2 text-center">{slot.uuid}</td>
              <td className="py-2 px-2 text-center">{convertUTCtoEST(slot.startTime)}</td>
              <td className="py-2 px-2 text-center">{convertUTCtoEST(slot.endTime)}</td>
              <td className="py-2 px-2 text-center">{slot.claimedUserPhoneNumber}</td>
              {/* <td className="py-2 px-2 text-center">{slot.claimedUserPhoneNumber ? slot.claimedUserPhoneNumber : '-'}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSlotsTable;