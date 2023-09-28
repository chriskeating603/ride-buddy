'use client'

// AvailabilityPostingForm.tsx

import { GiConfirmed } from "react-icons/gi";
// import { useState, useEffect } from "react";
import { FieldValues, set, useForm } from "react-hook-form";
// import { on } from 'events';
// import axios from "axios";
// import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// const AvailabilityPostingForm = () => {
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import toast from "react-hot-toast";
  // import { useRouter } from "next/router";
  
  const AvailabilityPostingForm: React.FC<{
    handleFormSubmit: (availabilityStart: string, availabilityEnd: string, duration: string, timeSlots: any) => void;
    setRequestId: (id: any) => void; // <-- Add this line
}> = ({ handleFormSubmit, setRequestId }) => { // <-- And this

    const router = useRouter()
    const [date, setDate] = useState("Today");
    const [duration, setDuration] = useState("30 minutes");
    const [availabilityStart, setAvailabilityStart] = useState(getDefaultStartTime());
    const [availabilityEnd, setAvailabilityEnd] = useState(getDefaultEndTime());
    // const [mostRecentRequestId, setMostRecentRequestId] = useState("");
    const [phoneNumbers, setPhoneNumbers] = useState(["(603) 548-8033", "(646) 583-2893"]); // NOTE: remove my phone number before pushing to prod
    const [isLoading, setIsLoading] = useState(false)
    const [timeSlots, setTimeSlots] = useState([]); // Add your exact time slot type here


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,  // Add this line
    reset
} = useForm<FieldValues>({
    defaultValues: {
        // funnyName: '',
        // phoneNumber: '',
        date: "Today",
      duration: "30 minutes",
      availabilityStart: getDefaultStartTime(),
      availabilityEnd: getDefaultEndTime(),
      phoneNumbers: phoneNumbers.filter(phoneNumber => phoneNumber !== ""), // Remove empty phone numbers
    },

})

  useEffect(() => {
    setAvailabilityStart(getDefaultStartTime());
    setAvailabilityEnd(getDefaultEndTime());
  }, []);

  function getDefaultStartTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }

  function getDefaultEndTime() {
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    return `${twoHoursFromNow.getHours().toString().padStart(2, '0')}:${twoHoursFromNow.getMinutes().toString().padStart(2, '0')}`;
  }

  const handleAddPhoneNumber = () => {
    if (phoneNumbers.length < 8) {
      setPhoneNumbers([...phoneNumbers, ""]);
    }
  };

const handlePhoneNumberChange = (index, value) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = formatPhoneNumber(value);
    setPhoneNumbers(updatedPhoneNumbers);
    // Use setValue to update the form value
    setValue(`phoneNumbers[${index}]`, updatedPhoneNumbers[index]);
};

  const formatPhoneNumber = (phoneNumber) => {
    // Remove any non-digit characters
    phoneNumber = phoneNumber.replace(/\D/g, "");

    // Apply the format (XXX) XXX-XXXX
    const matches = phoneNumber.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    let formattedPhoneNumber = "";
    if (matches[1]) {
      formattedPhoneNumber += `(${matches[1]}`;
    }
    if (matches[2]) {
      formattedPhoneNumber += `) ${matches[2]}`;
    }
    if (matches[3]) {
      formattedPhoneNumber += `-${matches[3]}`;
    }
    return formattedPhoneNumber;
  };

  const handleAvailabilityEndChange = (e) => {
    const [hours, minutes] = e.target.value.split(":");
    const updatedHours = Math.min(Math.max(Number(hours), 0), 23).toString().padStart(2, '0');
    const updatedMinutes = Math.min(Math.max(Number(minutes), 0), 59).toString().padStart(2, '0');
    setAvailabilityEnd(`${updatedHours}:${updatedMinutes}`);
  };

  const handleAvailabilityStartChange = (e) => {
    const [hours, minutes] = e.target.value.split(":");
    const updatedHours = Math.min(Math.max(Number(hours), 0), 23).toString().padStart(2, '0');
    const updatedMinutes = Math.min(Math.max(Number(minutes), 0), 59).toString().padStart(2, '0');
    setAvailabilityStart(`${updatedHours}:${updatedMinutes}`);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = {
        ...data,
    };
    console.log(formData);
    setIsLoading(true);
    axios.post('/api/create_listing', formData)
        .then((response) => {
            toast.success("Invite successful!");
            // console.log('id for entry', response);
            reset();
            router.refresh();
            setTimeSlots(response.data.createdTimeSlots); // Update the time slots in state
            console.log('settimeslots', response.data.createdTimeSlots);
            handleFormSubmit(availabilityStart, availabilityEnd, duration, response.data.createdTimeSlots);  // Pass directly
            setRequestId(response.data.availabilityPosting.id);  // <-- This line passes the id to the parent
            // console.log(response.data.id)
            // setMostRecentRequestId(response.data.id)
        })
        .catch((err) => {
            toast.error("Please try again", err);
        }).finally(() => {
            setIsLoading(false);
        });
    
        
  }

  return (
    <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition cursor-pointer sm:m-32 lg:m-32 md:m-32 mt-24">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Date (only available for today - this should be real time)
        </label>
        <div className="flex flex-col items-start">
          <label className="inline-flex items-center mb-2">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              value="Today"
              checked={date === "Today"}
              onChange={() => setDate("Today")}
            />
            <span className="ml-2">Today</span>
          </label>
          {/* REMOVING THIS FOR NOW - WANT TO VALIDATE WHETHER USERS WANT TO USE FOR FUTURE PLANNING PURPOSES
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              value="Tomorrow"
              checked={date === "Tomorrow"}
              onChange={() => setDate("Tomorrow")}
            />
            <span className="ml-2">Tomorrow</span>
          </label> */}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Start of availability? (Default is now)
        </label>
        <div className="flex items-start">
          <input
            type="time"
            className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
            value={availabilityStart}
            onChange={handleAvailabilityStartChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
        End of availability? (Default is t + 2hours)
        </label>
        <div className="flex items-start">
          <input
            type="time"
            className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
            value={availabilityEnd}
            onChange={handleAvailabilityEndChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          How long for each call?
        </label>
        <div className="flex flex-col items-start">
          <label className="inline-flex items-center mb-2">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              value="15 minutes"
              checked={duration === "15 minutes"}
              onChange={() => setDuration("15 minutes")}
            />
            <span className="ml-2">15 minutes</span>
          </label>
          <label className="inline-flex items-center mb-2">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              value="30 minutes"
              checked={duration === "30 minutes"}
              onChange={() => setDuration("30 minutes")}
            />
            <span className="ml-2">30 minutes</span>
          </label>
          <label className="inline-flex items-center mb-2">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              value="45 minutes"
              checked={duration === "45 minutes"}
              onChange={() => setDuration("45 minutes")}
            />
            <span className="ml-2">45 minutes</span>
          </label>
          <label className="inline-flex items-center mb-2">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              value="60 minutes"
              checked={duration === "60 minutes"}
              onChange={() => setDuration("60 minutes")}
            />
            <span className="ml-2">60 minutes</span>
          </label>
        </div>
      </div>


      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Add Your Buddies Phone Numbers
        </label>
        {phoneNumbers.map((phoneNumber, index) => (
    <div className="flex items-center gap-2 mb-2 " key={index}>
        <input
            type="text"
            className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-64 "
            placeholder="(___) ___-____"
            value={phoneNumber}
            onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
        />
    </div>
))}
            <div className="ml-2 ">
                <button
                type="button"
                className="p-2 bg-white border border-blue-600 rounded-full text-blue-600 w-48"
                onClick={handleAddPhoneNumber}
                >
                Add Another #
                </button>
            </div>

      </div>

      <div className="flex items-center justify-center mt-6">
        <button
          type="button"
          className="py-2 px-4 bg-[#0115fc] rounded-full text-white text-lg font-semibold flex items-center gap-2"
          onClick={handleSubmit(onSubmit)}
          disabled={phoneNumbers.every(phoneNumber => phoneNumber === "")}
        >
          Submit
          <div className="p-2 bg-[#0115fc] rounded-full text-white">
            <GiConfirmed size={18} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default AvailabilityPostingForm;