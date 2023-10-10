'use client'
// // AvailabilityPostingForm.tsx

import { GiConfirmed } from "react-icons/gi";
import { FieldValues, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DateTime } from 'luxon';
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

const AvailabilityPostingForm: React.FC<{
  handleFormSubmit: (availabilityStart: string, availabilityEnd: string, duration: string, timeSlots: any) => void;
  setRequestId: (id: any) => void;
  currentUser: any;
}> = ({ handleFormSubmit, setRequestId, currentUser }) => {

  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | null>(new Date()); // Separate state for start date
  const [endDate, setEndDate] = useState<Date | null>(new Date()); // Separate state for end date
  const [startTime, setStartTime] = useState(getDefaultStartTime());
  const [endTime, setEndTime] = useState(getDefaultEndTime());
  const [duration, setDuration] = useState("30 minutes");
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [userTimeZone, setUserTimeZone] = useState<string | null>(null);
  const [phoneNumbers, setPhoneNumbers] = useState(["(603) 548-8033", "(646) 583-2893"]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);

  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      date: new Date(), // Set the default date to today
      duration: "30 minutes",
      startTime: getDefaultStartTime(),
      endTime: getDefaultEndTime(),
      phoneNumbers: phoneNumbers.filter(phoneNumber => phoneNumber !== ""),
    },
  });

  useEffect(() => {
    setUserTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
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

  const handlePhoneNumberChange = (index: number, value: string) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = formatPhoneNumber(value);
    setPhoneNumbers(updatedPhoneNumbers);
    setValue(`phoneNumbers[${index}]`, updatedPhoneNumbers[index]);
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove any non-digit characters
    phoneNumber = phoneNumber.replace(/\D/g, "");

    // Apply the format (XXX) XXX-XXXX
    const matches = phoneNumber.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    let formattedPhoneNumber = "";
    if (matches) {
      if (matches[1]) {
        formattedPhoneNumber += `(${matches[1]}`;
      }
      if (matches[2]) {
        formattedPhoneNumber += `) ${matches[2]}`;
      }
      if (matches[3]) {
        formattedPhoneNumber += `-${matches[3]}`;
      }
    }
    return formattedPhoneNumber;
  };

  const handleFormClick = (e: React.MouseEvent) => {
    if (!currentUser) {
      e.preventDefault();
      loginModal.onOpen();
    }
  };

  const onSubmit = async (data: FieldValues) => {
    // Convert date and time to DateTime objects
    const chosenStartDate = DateTime.fromJSDate(startDate!); // Use "!" to indicate that date cannot be null
    const chosenEndDate = DateTime.fromJSDate(endDate!);

    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");

    const localStartDateTime = chosenStartDate.set({ hour: +startHour, minute: +startMinute });
    const localEndDateTime = chosenEndDate.set({ hour: +endHour, minute: +endMinute });

    // Convert local date-time to UTC
    const utcStartTimestamp = localStartDateTime.toUTC().toISO();
    const utcEndTimestamp = localEndDateTime.toUTC().toISO();

    const formData = {
      ...data,
      timezone: userTimeZone,
      availabilityStart: utcStartTimestamp,
      availabilityEnd: utcEndTimestamp,
      duration: parseInt(duration.split(" ")[0], 10),
      phoneNumbers: JSON.stringify(phoneNumbers),
      
    };

    setIsLoading(true);
    axios
      .post('/api/create_listing', formData)
      .then((response) => {
        toast.success("Invite successful!");
        reset();
        router.refresh();
        setTimeSlots(response.data.createdTimeSlots);
        handleFormSubmit(startTime, endTime, duration, response.data.createdTimeSlots);
        setRequestId(response.data.availabilityPosting.id);
      })
      .catch((err) => {
        toast.error("Please try again", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div onClick={handleFormClick} className="border p-4 rounded-md shadow-sm hover:shadow-md transition cursor-pointer sm:m-32 lg:m-32 md:m-32 mt-24">
      {/* Start Date Picker */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Start Date
        </label>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-64"
        />
      </div>

      {/* Start Time */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Start Time
        </label>
        <div className="flex items-start">
          <input
            type="time"
            className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
      </div>

      {/* End Date Picker */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          End Date
        </label>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-64"
        />
      </div>

      {/* End Time */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          End Time
        </label>
        <div className="flex items-start">
          <input
            type="time"
            className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
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
          {/* Add other duration options as needed */}
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


