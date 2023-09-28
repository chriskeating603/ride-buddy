
// import { GiConfirmed } from "react-icons/gi";
// import { useState, useEffect } from "react";

// const MyForm = () => {
//   const [date, setDate] = useState("");
//   const [duration, setDuration] = useState("15 minutes");
//   const [availabilityEnd, setAvailabilityEnd] = useState(getDefaultEndTime());
//   const [phoneNumbers, setPhoneNumbers] = useState([""]);

//   useEffect(() => {
//     setAvailabilityEnd(getDefaultEndTime());
//   }, []);

//   function getDefaultEndTime() {
//     const now = new Date();
//     const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
//     return `${twoHoursFromNow.getHours().toString().padStart(2, '0')}:${twoHoursFromNow.getMinutes().toString().padStart(2, '0')}`;
//   }

//   const handleAddPhoneNumber = () => {
//     if (phoneNumbers.length < 5) {
//       setPhoneNumbers([...phoneNumbers, ""]);
//     }
//   };

//   const handlePhoneNumberChange = (index, value) => {
//     const updatedPhoneNumbers = [...phoneNumbers];
//     updatedPhoneNumbers[index] = formatPhoneNumber(value);
//     setPhoneNumbers(updatedPhoneNumbers);
//   };

//   const formatPhoneNumber = (phoneNumber) => {
//     // Remove any non-digit characters
//     phoneNumber = phoneNumber.replace(/\D/g, "");

//     // Apply the format (XXX) XXX-XXXX
//     const matches = phoneNumber.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
//     let formattedPhoneNumber = "";
//     if (matches[1]) {
//       formattedPhoneNumber += `(${matches[1]}`;
//     }
//     if (matches[2]) {
//       formattedPhoneNumber += `) ${matches[2]}`;
//     }
//     if (matches[3]) {
//       formattedPhoneNumber += `-${matches[3]}`;
//     }
//     return formattedPhoneNumber;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       date,
//       duration,
//       availabilityEnd,
//       phoneNumbers: phoneNumbers.filter(phoneNumber => phoneNumber !== ""), // Remove empty phone numbers
//     };
//     console.log(formData);
//   };

//   return (
//     <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition cursor-pointer m-20">
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Date
//         </label>
//         <div className="flex flex-col items-start">
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="Today"
//               checked={date === "Today"}
//               onChange={() => setDate("Today")}
//             />
//             <span className="ml-2">Today</span>
//           </label>
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="Tomorrow"
//               checked={date === "Tomorrow"}
//               onChange={() => setDate("Tomorrow")}
//             />
//             <span className="ml-2">Tomorrow</span>
//           </label>
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           How long for each call
//         </label>
//         <div className="flex flex-col items-start">
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="15 minutes"
//               checked={duration === "15 minutes"}
//               onChange={() => setDuration("15 minutes")}
//             />
//             <span className="ml-2">15 minutes</span>
//           </label>
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="30 minutes"
//               checked={duration === "30 minutes"}
//               onChange={() => setDuration("30 minutes")}
//             />
//             <span className="ml-2">30 minutes</span>
//           </label>
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="45 minutes"
//               checked={duration === "45 minutes"}
//               onChange={() => setDuration("45 minutes")}
//             />
//             <span className="ml-2">45 minutes</span>
//           </label>
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="60 minutes"
//               checked={duration === "60 minutes"}
//               onChange={() => setDuration("60 minutes")}
//             />
//             <span className="ml-2">60 minutes</span>
//           </label>
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           When is the end of your availability
//         </label>
//         <input
//           type="time"
//           className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
//           value={availabilityEnd}
//           onChange={(e) => setAvailabilityEnd(e.target.value)}
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Add Your Buddies Phone Numbers
//         </label>
//         {phoneNumbers.map((phoneNumber, index) => (
//           <div className="flex items-center gap-2 mb-2" key={index}>
//             <input
//               type="text"
//               className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-48"
//               placeholder="(XXX) XXX-XXXX"
//               value={phoneNumber}
//               onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
//             />
//             {index === phoneNumbers.length - 1 && phoneNumber !== "" && (
//               <button
//                 type="button"
//                 className="p-2 bg-[#0115fc] rounded-full text-white"
//                 onClick={handleAddPhoneNumber}
//               >
//                 +
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center justify-center mt-6">
//         <button
//           type="button"
//           className="py-2 px-4 bg-[#0115fc] rounded-full text-white text-lg font-semibold flex items-center gap-2"
//           onClick={handleSubmit}
//           disabled={phoneNumbers.every(phoneNumber => phoneNumber === "")}
//         >
//           Submit
//           <div className="p-2 bg-[#0115fc] rounded-full text-white">
//             <GiConfirmed size={18} />
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyForm;


{/* <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center items-center gap-3"> */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Add Your Buddies Phone Numbers
//             </label>
//             {phoneNumbers.map((phoneNumber, index) => (
//               <div className="flex items-center gap-2 mb-2" key={index}>
//                 <input
//                   type="text"
//                   className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
//                   placeholder="Phone Number"
//                   value={phoneNumber}
//                   onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
//                 />
//                 {index === phoneNumbers.length - 1 && (
//                   <button
//                     type="button"
//                     className="p-2 bg-[#0115fc] rounded-full text-white"
//                     onClick={handleAddPhoneNumber}
//                   >
//                     +
//                   </button>
//                 )}
//               </div>

// import { GiConfirmed } from "react-icons/gi";
// import { useState } from "react";

// const MyForm = () => {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [duration, setDuration] = useState("15 minutes");
//   const [availabilityEnd, setAvailabilityEnd] = useState(getDefaultEndTime());
//   const [phoneNumbers, setPhoneNumbers] = useState([""]);

//   function getDefaultEndTime() {
//     const now = new Date();
//     const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
//     return `${twoHoursFromNow.getHours()}:${twoHoursFromNow.getMinutes()}`;
//   }

//   const handleAddPhoneNumber = () => {
//     if (phoneNumbers.length < 5) {
//       setPhoneNumbers([...phoneNumbers, ""]);
//     }
//   };

//   const handlePhoneNumberChange = (index, value) => {
//     const updatedPhoneNumbers = [...phoneNumbers];
//     updatedPhoneNumbers[index] = value;
//     setPhoneNumbers(updatedPhoneNumbers);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       date,
//       time,
//       duration,
//       availabilityEnd,
//       phoneNumbers: phoneNumbers.filter(phoneNumber => phoneNumber !== ""), // Remove empty phone numbers
//     };
//     console.log(formData);
//   };

//   return (
//     <div className="m-20 border p-4 rounded-md shadow-sm hover:shadow-md transition cursor-pointer">

// import { GiConfirmed } from "react-icons/gi";
// import { useState, useEffect } from "react";

// const MyForm = () => {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [duration, setDuration] = useState("15 minutes");
//   const [availabilityEnd, setAvailabilityEnd] = useState(getDefaultEndTime());
//   const [phoneNumbers, setPhoneNumbers] = useState([""]);

//   useEffect(() => {
//     setAvailabilityEnd(getDefaultEndTime());
//   }, []);

//   function getDefaultEndTime() {
//     const now = new Date();
//     const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
//     return `${twoHoursFromNow.getHours().toString().padStart(2, '0')}:${twoHoursFromNow.getMinutes().toString().padStart(2, '0')}`;
//   }

//   const handleAddPhoneNumber = () => {
//     if (phoneNumbers.length < 5) {
//       setPhoneNumbers([...phoneNumbers, ""]);
//     }
//   };

//   const handlePhoneNumberChange = (index, value) => {
//     const updatedPhoneNumbers = [...phoneNumbers];
//     updatedPhoneNumbers[index] = value;
//     setPhoneNumbers(updatedPhoneNumbers);
//   };

//   const isValidPhoneNumber = (phoneNumber) => {
//     const phoneRegex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
//     return phoneRegex.test(phoneNumber);
//   };

//   const formatPhoneNumber = (phoneNumber) => {
//     const matches = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
//     return `(${matches[1]}) ${matches[2]}-${matches[3]}`;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       date,
//       time,
//       duration,
//       availabilityEnd,
//       phoneNumbers: phoneNumbers.filter(phoneNumber => phoneNumber !== ""), // Remove empty phone numbers
//     };
//     console.log(formData);
//   };

//   return (
//     <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition cursor-pointer m-20">
//       {/* Rest of the code remains the same */}

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Date
//         </label>
//         <div className="flex flex-col items-start">
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="Today"
//               checked={date === "Today"}
//               onChange={() => setDate("Today")}
//             />
//             <span className="ml-2">Today</span>
//           </label>
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="Tomorrow"
//               checked={date === "Tomorrow"}
//               onChange={() => setDate("Tomorrow")}
//             />
//             <span className="ml-2">Tomorrow</span>
//           </label>
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Time
//         </label>
//         <div className="flex flex-col items-start">
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="5 minutes"
//               checked={time === "5 minutes"}
//               onChange={() => setTime("5 minutes")}
//             />
//             <span className="ml-2">5 minutes</span>
//           </label>
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="15 minutes"
//               checked={time === "15 minutes"}
//               onChange={() => setTime("15 minutes")}
//             />
//             <span className="ml-2">15 minutes</span>
//           </label>
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="45 minutes"
//               checked={time === "45 minutes"}
//               onChange={() => setTime("45 minutes")}
//             />
//             <span className="ml-2">45 minutes</span>
//           </label>
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="60 minutes"
//               checked={time === "60 minutes"}
//               onChange={() => setTime("60 minutes")}
//             />
//             <span className="ml-2">60 minutes</span>
//           </label>
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           How long for each call
//         </label>
//         <div className="flex flex-col items-start">
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="15 minutes"
//               checked={duration === "15 minutes"}
//               onChange={() => setDuration("15 minutes")}
//             />
//             <span className="ml-2">15 minutes</span>
//           </label>
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="30 minutes"
//               checked={duration === "30 minutes"}
//               onChange={() => setDuration("30 minutes")}
//             />
//             <span className="ml-2">30 minutes</span>
//           </label>
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="45 minutes"
//               checked={duration === "45 minutes"}
//               onChange={() => setDuration("45 minutes")}
//             />
//             <span className="ml-2">45 minutes</span>
//           </label>
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="60 minutes"
//               checked={duration === "60 minutes"}
//               onChange={() => setDuration("60 minutes")}
//             />
//             <span className="ml-2">60 minutes</span>
//           </label>
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           When is the end of your availability?
//         </label>
//         <input
//           type="time"
//           className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
//           value={availabilityEnd}
//           onChange={(e) => setAvailabilityEnd(e.target.value)}
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Add Your Buddies Phone Numbers
//         </label>
//         {phoneNumbers.map((phoneNumber, index) => (
//           <div className="flex items-center gap-2 mb-2" key={index}>
//             <input
//               type="text"
//               className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
//               placeholder="Phone Number"
//               value={phoneNumber}
//               onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
//             />
//             {index === phoneNumbers.length - 1 && phoneNumber !== "" && (
//               <button
//                 type="button"
//                 className="p-2 bg-[#0115fc] rounded-full text-white"
//                 onClick={handleAddPhoneNumber}
//               >
//                 +
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center justify-center mt-6">
//         <button
//           type="button"
//           className="py-2 px-4 bg-[#0115fc] rounded-full text-white text-lg font-semibold flex items-center gap-2"
//           onClick={handleSubmit}
//           disabled={phoneNumbers.every(phoneNumber => phoneNumber === "")}
//         >
//           Submit
//           <div className="p-2 bg-[#0115fc] rounded-full text-white">
//             <GiConfirmed size={18} />
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyForm;


// import { GiConfirmed } from "react-icons/gi";
// import { useState } from "react";

// const MyForm = () => {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [phoneNumbers, setPhoneNumbers] = useState([""]);

//   const handleAddPhoneNumber = () => {
//     if (phoneNumbers.length < 5) {
//       setPhoneNumbers([...phoneNumbers, ""]);
//     }
//   };

//   const handlePhoneNumberChange = (index, value) => {
//     const updatedPhoneNumbers = [...phoneNumbers];
//     updatedPhoneNumbers[index] = value;
//     setPhoneNumbers(updatedPhoneNumbers);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       date,
//       time,
//       phoneNumbers: phoneNumbers.filter(phoneNumber => phoneNumber !== ""), // Remove empty phone numbers
//     };
//     console.log(formData);
//   };

//   return (
//     <div className="m-20 border p-4 rounded-md shadow-sm hover:shadow-md transition cursor-pointer">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
//         <div className="w-full sm:w-1/3">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Date
//           </label>
//           <div className="flex flex-row sm:flex-col items-center">
//             <label className="inline-flex items-center mb-2 sm:mr-4">
//               <input
//                 type="radio"
//                 className="form-radio h-5 w-5 text-blue-600"
//                 value="Today"
//                 checked={date === "Today"}
//                 onChange={() => setDate("Today")}
//               />
//               <span className="ml-2">Today</span>
//             </label>
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 className="form-radio h-5 w-5 text-blue-600"
//                 value="Tomorrow"
//                 checked={date === "Tomorrow"}
//                 onChange={() => setDate("Tomorrow")}
//               />
//               <span className="ml-2">Tomorrow</span>
//             </label>
//           </div>
//         </div>

//         <div className="w-full sm:w-1/3 sm:ml-6 mt-4 sm:mt-0">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Time
//           </label>
//           <div className="flex flex-row sm:flex-col items-center">
//             <label className="inline-flex items-center mb-2 sm:mr-4">
//               <input
//                 type="radio"
//                 className="form-radio h-5 w-5 text-blue-600"
//                 value="5 minutes"
//                 checked={time === "5 minutes"}
//                 onChange={() => setTime("5 minutes")}
//               />
//               <span className="ml-2">5 minutes</span>
//             </label>
//             <label className="inline-flex items-center mb-2 sm:mr-4">
//               <input
//                 type="radio"
//                 className="form-radio h-5 w-5 text-blue-600"
//                 value="15 minutes"
//                 checked={time === "15 minutes"}
//                 onChange={() => setTime("15 minutes")}
//               />
//               <span className="ml-2">15 minutes</span>
//             </label>
//             <label className="inline-flex items-center mb-2 sm:mr-4">
//               <input
//                 type="radio"
//                 className="form-radio h-5 w-5 text-blue-600"
//                 value="30 minutes"
//                 checked={time === "30 minutes"}
//                 onChange={() => setTime("30 minutes")}
//               />
//               <span className="ml-2">30 minutes</span>
//             </label>
//             <label className="inline-flex items-center mb-2">
//               <input
//                 type="radio"
//                 className="form-radio h-5 w-5 text-blue-600"
//                 value="60 minutes"
//                 checked={time === "60 minutes"}
//                 onChange={() => setTime("60 minutes")}
//               />
//               <span className="ml-2">60 minutes</span>
//             </label>
//           </div>
//         </div>

//         <div className="w-full sm:w-1/3 sm:ml-6 mt-4 sm:mt-0">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Add Your Buddies Phone Numbers
//           </label>
//           {phoneNumbers.map((phoneNumber, index) => (
//             <div className="flex items-center gap-2 mb-2" key={index}>
//               <input
//                 type="text"
//                 className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
//                 placeholder="Phone Number"
//                 value={phoneNumber}
//                 onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
//               />
//               {index === phoneNumbers.length - 1 && phoneNumber !== "" && (
//                 <button
//                   type="button"
//                   className="p-2 bg-[#0115fc] rounded-full text-white"
//                   onClick={handleAddPhoneNumber}
//                 >
//                   +
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center justify-center mt-6">
//         <button
//           type="button"
//           className="py-2 px-4 bg-[#0115fc] rounded-full text-white text-lg font-semibold flex items-center gap-2"
//           onClick={handleSubmit}
//           disabled={phoneNumbers.every(phoneNumber => phoneNumber === "")}
//         >
//           Submit
//           <div className="p-2 bg-[#0115fc] rounded-full text-white">
//             <GiConfirmed size={18} />
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyForm;


// import { GiConfirmed } from "react-icons/gi";
// import { useState } from "react";

// const MyForm = () => {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [phoneNumbers, setPhoneNumbers] = useState([""]);

//   const handleAddPhoneNumber = () => {
//     if (phoneNumbers.length < 5) {
//       setPhoneNumbers([...phoneNumbers, ""]);
//     }
//   };

//   const handlePhoneNumberChange = (index, value) => {
//     const updatedPhoneNumbers = [...phoneNumbers];
//     updatedPhoneNumbers[index] = value;
//     setPhoneNumbers(updatedPhoneNumbers);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       date,
//       time,
//       phoneNumbers: phoneNumbers.filter(phoneNumber => phoneNumber !== ""), // Remove empty phone numbers
//     };
//     console.log(formData);
//   };

//   return (
//     <div className="m-20 border p-4 rounded-md shadow-sm hover:shadow-md transition cursor-pointer">

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Date
//         </label>
//         <div className="flex flex-col items-start">
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="Today"
//               checked={date === "Today"}
//               onChange={() => setDate("Today")}
//             />
//             <span className="ml-2">Today</span>
//           </label>
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="Tomorrow"
//               checked={date === "Tomorrow"}
//               onChange={() => setDate("Tomorrow")}
//             />
//             <span className="ml-2">Tomorrow</span>
//           </label>
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Time
//         </label>
//         <div className="flex flex-col items-start">
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="5 minutes"
//               checked={time === "5 minutes"}
//               onChange={() => setTime("5 minutes")}
//             />
//             <span className="ml-2">5 minutes</span>
//           </label>
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="15 minutes"
//               checked={time === "15 minutes"}
//               onChange={() => setTime("15 minutes")}
//             />
//             <span className="ml-2">15 minutes</span>
//           </label>
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="30 minutes"
//               checked={time === "30 minutes"}
//               onChange={() => setTime("30 minutes")}
//             />
//             <span className="ml-2">30 minutes</span>
//           </label>
//           <label className="inline-flex items-center mb-2">
//             <input
//               type="radio"
//               className="form-radio h-5 w-5 text-blue-600"
//               value="60 minutes"
//               checked={time === "60 minutes"}
//               onChange={() => setTime("60 minutes")}
//             />
//             <span className="ml-2">60 minutes</span>
//           </label>
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Add Your Buddies Phone Numbers
//         </label>
//         {phoneNumbers.map((phoneNumber, index) => (
//           <div className="flex items-center gap-2 mb-2" key={index}>
//             <input
//               type="text"
//               className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
//               placeholder="Phone Number"
//               value={phoneNumber}
//               onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
//             />
//             {index === phoneNumbers.length - 1 && phoneNumber !== "" && (
//               <button
//                 type="button"
//                 className="p-2 bg-[#0115fc] rounded-full text-white"
//                 onClick={handleAddPhoneNumber}
//               >
//                 +
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center justify-center mt-6">
//         <button
//           type="button"
//           className="py-2 px-4 bg-[#0115fc] rounded-full text-white text-lg font-semibold"
//           onClick={handleSubmit}
//           disabled={phoneNumbers.every(phoneNumber => phoneNumber === "")}
//         >
//           Submit
//         </button>
//         <div className="p-2 bg-[#0115fc] rounded-full text-white">
//           <GiConfirmed size={18} />
//         </div>
//       </div>

//     </div>
//   );
// };

// export default MyForm;


// import { GiConfirmed } from "react-icons/gi";
// import { useState } from "react";

// const MyForm = () => {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [phoneNumbers, setPhoneNumbers] = useState([""]);

//   const handleAddPhoneNumber = () => {
//     if (phoneNumbers.length < 5) {
//       setPhoneNumbers([...phoneNumbers, ""]);
//     }
//   };

//   const handlePhoneNumberChange = (index, value) => {
//     const updatedPhoneNumbers = [...phoneNumbers];
//     updatedPhoneNumbers[index] = value;
//     setPhoneNumbers(updatedPhoneNumbers);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       date,
//       time,
//       phoneNumbers: phoneNumbers.filter(phoneNumber => phoneNumber !== ""), // Remove empty phone numbers
//     };
//     console.log(formData);
//   };

//   return (
//     <div className="m-20 border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
//       <div className="flex flex-col sm:flex-row items-start justify-between">

//         <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-left">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Date
//             </label>
//             <div className="flex flex-col items-center">
//               <label className="inline-flex items-center mb-2">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="Today"
//                   checked={date === "Today"}
//                   onChange={() => setDate("Today")}
//                 />
//                 <span className="ml-2">Today</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="Tomorrow"
//                   checked={date === "Tomorrow"}
//                   onChange={() => setDate("Tomorrow")}
//                 />
//                 <span className="ml-2">Tomorrow</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-left">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Time
//             </label>
//             <div className="flex flex-col items-center">
//               <label className="inline-flex items-center mb-2">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="5 minutes from now"
//                   checked={time === "5 minutes from now"}
//                   onChange={() => setTime("5 minutes from now")}
//                 />
//                 <span className="ml-2">5 minutes from now</span>
//               </label>
//               <label className="inline-flex items-center mb-2">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="15 minutes from now"
//                   checked={time === "15 minutes from now"}
//                   onChange={() => setTime("15 minutes from now")}
//                 />
//                 <span className="ml-2">15 minutes from now</span>
//               </label>
//               <label className="inline-flex items-center mb-2">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="30 minutes from now"
//                   checked={time === "30 minutes from now"}
//                   onChange={() => setTime("30 minutes from now")}
//                 />
//                 <span className="ml-2">30 minutes from now</span>
//               </label>
//               <label className="inline-flex items-center mb-2">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="60 minutes from now"
//                   checked={time === "60 minutes from now"}
//                   onChange={() => setTime("60 minutes from now")}
//                 />
//                 <span className="ml-2">60 minutes from now</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-left items-start">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Add Your Buddies Phone Numbers
//             </label>
//             {phoneNumbers.map((phoneNumber, index) => (
//               <div className="flex items-center gap-2 mb-2" key={index}>
//                 <input
//                   type="text"
//                   className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
//                   placeholder="Phone Number"
//                   value={phoneNumber}
//                   onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
//                 />
//                 {index === phoneNumbers.length - 1 && phoneNumber !== "" && (
//                   <button
//                     type="button"
//                     className="p-2 bg-[#0115fc] rounded-full text-white"
//                     onClick={handleAddPhoneNumber}
//                   >
//                     +
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>

//       <div className="flex flex-col items-center mt-4 sm:hidden">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Date
//           </label>
//           <div className="flex flex-col items-center">
//             <label className="inline-flex items-center mb-2">
//               <input
//                 type="radio"
//                 className="form-radio h-5 w-5 text-blue-600"
//                 value="Today"
//                 checked={date === "Today"}
//                 onChange={() => setDate("Today")}
//               />
//               <span className="ml-2">Today</span>
//             </label>
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 className="form-radio h-5 w-5 text-blue-600"
//                 value="Tomorrow"
//                 checked={date === "Tomorrow"}
//                 onChange={() => setDate("Tomorrow")}
//               />
//               <span className="ml-2">Tomorrow</span>
//             </label>
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Time
//           </label>
//           <div className="flex flex-col items-center">
//             <label className="inline-flex items-center mb-2">
//               <input
//                 type="radio"
//                 className="form-radio h-5 w-5 text-blue-600"
//                 value="5 minutes from now"
//                 checked={time === "5 minutes from now"}
//                 onChange={() => setTime("5 minutes from now")}
//               />
//               <span className="ml-2">5 minutes from now</span>
//             </label>
//             <label className="inline-flex items-center mb-2">
//               <input
//                 type="radio"
//                 className="form-radio h-5 w-5 text-blue-600"
//                 value="15 minutes from now"
//                 checked={time === "15 minutes from now"}
//                 onChange={() => setTime("15 minutes from now")}
//               />
//               <span className="ml-2">15 minutes from now</span>
//             </label>
//             <label className="inline-flex items-center mb-2">
//               <input
//                 type="radio"
//                 className="form-radio h-5 w-5 text-blue-600"
//                 value="30 minutes from now"
//                 checked={time === "30 minutes from now"}
//                 onChange={() => setTime("30 minutes from now")}
//               />
//               <span className="ml-2">30 minutes from now</span>
//             </label>
//             <label className="inline-flex items-center mb-2">
//               <input
//                 type="radio"
//                 className="form-radio h-5 w-5 text-blue-600"
//                 value="60 minutes from now"
//                 checked={time === "60 minutes from now"}
//                 onChange={() => setTime("60 minutes from now")}
//               />
//               <span className="ml-2">60 minutes from now</span>
//             </label>
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Add Your Buddies Phone Numbers
//           </label>
//           {phoneNumbers.map((phoneNumber, index) => (
//             <div className="flex items-center gap-2 mb-2" key={index}>
//               <input
//                 type="text"
//                 className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
//                 placeholder="Phone Number"
//                 value={phoneNumber}
//                 onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
//               />
//               {index === phoneNumbers.length - 1 && phoneNumber !== "" && (
//                 <button
//                   type="button"
//                   className="p-2 bg-[#0115fc] rounded-full text-white"
//                   onClick={handleAddPhoneNumber}
//                 >
//                   +
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-col items-center mt-4 sm:hidden">
//         <button
//           type="button"
//           className="p-2 bg-[#0115fc] rounded-full text-white text-lg"
//           onClick={handleSubmit}
//           disabled={phoneNumbers.every(phoneNumber => phoneNumber === "")}
//         >
//           Submit
//         </button>
//         <div className="p-2 bg-[#0115fc] rounded-full text-white">
//           <GiConfirmed size={18} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyForm;


// import { GiConfirmed } from "react-icons/gi";
// import { useState } from "react";

// const MyForm = () => {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [phoneNumbers, setPhoneNumbers] = useState([""]);

//   const handleAddPhoneNumber = () => {
//     if (phoneNumbers.length < 5 && phoneNumbers[phoneNumbers.length - 1] !== "") {
//       setPhoneNumbers([...phoneNumbers, ""]);
//     }
//   };

//   const handlePhoneNumberChange = (index, value) => {
//     const updatedPhoneNumbers = [...phoneNumbers];
//     updatedPhoneNumbers[index] = value;
//     setPhoneNumbers(updatedPhoneNumbers);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       date,
//       time,
//       phoneNumbers: phoneNumbers.filter(phoneNumber => phoneNumber !== ""), // Remove empty phone numbers
//     };
//     console.log(formData);
//   };

//   return (
//     <div className="
//     m-20
//         border-[1px]
//         w-full
//         md:w-auto
//         py-2
//         rounded-full
//         shadow-sm
//         hover:shadow-md
//         transition
//         cursor-pointer
//         ">
//       <div className="flex flex-col sm:flex-row items-center justify-between">

//         <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Date
//             </label>
//             <div className="flex flex-col items-center">
//               <label className="inline-flex items-center mb-2">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="Today"
//                   checked={date === "Today"}
//                   onChange={() => setDate("Today")}
//                 />
//                 <span className="ml-2">Today</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="Tomorrow"
//                   checked={date === "Tomorrow"}
//                   onChange={() => setDate("Tomorrow")}
//                 />
//                 <span className="ml-2">Tomorrow</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Time
//             </label>
//             <div className="flex flex-col items-center">
//               <label className="inline-flex items-center mb-2">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="5 minutes from now"
//                   checked={time === "5 minutes from now"}
//                   onChange={() => setTime("5 minutes from now")}
//                 />
//                 <span className="ml-2">5 minutes from now</span>
//               </label>
//               <label className="inline-flex items-center mb-2">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="15 minutes from now"
//                   checked={time === "15 minutes from now"}
//                   onChange={() => setTime("15 minutes from now")}
//                 />
//                 <span className="ml-2">15 minutes from now</span>
//               </label>
//               <label className="inline-flex items-center mb-2">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="30 minutes from now"
//                   checked={time === "30 minutes from now"}
//                   onChange={() => setTime("30 minutes from now")}
//                 />
//                 <span className="ml-2">30 minutes from now</span>
//               </label>
//               <label className="inline-flex items-center mb-2">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="60 minutes from now"
//                   checked={time === "60 minutes from now"}
//                   onChange={() => setTime("60 minutes from now")}
//                 />
//                 <span className="ml-2">60 minutes from now</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center items-center gap-3">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Add Your Buddies Phone Numbers
//             </label>
//             {phoneNumbers.map((phoneNumber, index) => (
//               <div className="flex items-center gap-2 mb-2" key={index}>
//                 <input
//                   type="text"
//                   className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
//                   placeholder="Phone Number"
//                   value={phoneNumber}
//                   onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
//                 />
//                 {index === phoneNumbers.length - 1 && phoneNumber !== "" && (
//                   <button
//                     type="button"
//                     className="p-2 bg-[#0115fc] rounded-full text-white"
//                     onClick={handleAddPhoneNumber}
//                   >
//                     +
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>

//       <div className="flex flex-col items-center mt-4 sm:hidden">
//         <button
//           type="button"
//           className="p-2 bg-[#0115fc] rounded-full text-white text-lg"
//           onClick={handleSubmit}
//           disabled={phoneNumbers.every(phoneNumber => phoneNumber === "")}
//         >
//           Submit
//         </button>
//         <div className="p-2 bg-[#0115fc] rounded-full text-white">
//           <GiConfirmed size={18} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyForm;


// import { GiConfirmed } from "react-icons/gi";
// import { useState } from "react";

// const MyForm = () => {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [phoneNumbers, setPhoneNumbers] = useState([""]);

//   const handleAddPhoneNumber = () => {
//     if (phoneNumbers.length < 5) {
//       setPhoneNumbers([...phoneNumbers, ""]);
//     }
//   };

//   const handlePhoneNumberChange = (index, value) => {
//     const updatedPhoneNumbers = [...phoneNumbers];
//     updatedPhoneNumbers[index] = value;
//     setPhoneNumbers(updatedPhoneNumbers);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       date,
//       time,
//       phoneNumbers,
//     };
//     console.log(formData);
//   };

//   return (
//     <div className="
//     m-20
//         border-[1px]
//         w-full
//         md:w-auto
//         py-2
//         rounded-full
//         shadow-sm
//         hover:shadow-md
//         transition
//         cursor-pointer
//         ">
//       <div className="flex flex-row items-center justify-between">
//         <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Date
//             </label>
//             <div className="flex items-center gap-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="Today"
//                   checked={date === "Today"}
//                   onChange={() => setDate("Today")}
//                 />
//                 <span className="ml-2">Today</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="Tomorrow"
//                   checked={date === "Tomorrow"}
//                   onChange={() => setDate("Tomorrow")}
//                 />
//                 <span className="ml-2">Tomorrow</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Time
//             </label>
//             <div className="flex items-center gap-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="5 minutes from now"
//                   checked={time === "5 minutes from now"}
//                   onChange={() => setTime("5 minutes from now")}
//                 />
//                 <span className="ml-2">5 minutes from now</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="15 minutes from now"
//                   checked={time === "15 minutes from now"}
//                   onChange={() => setTime("15 minutes from now")}
//                 />
//                 <span className="ml-2">15 minutes from now</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="30 minutes from now"
//                   checked={time === "30 minutes from now"}
//                   onChange={() => setTime("30 minutes from now")}
//                 />
//                 <span className="ml-2">30 minutes from now</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value="60 minutes from now"
//                   checked={time === "60 minutes from now"}
//                   onChange={() => setTime("60 minutes from now")}
//                 />
//                 <span className="ml-2">60 minutes from now</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center items-center gap-3">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Add Your Buddies Phone Numbers
//             </label>
//             {phoneNumbers.map((phoneNumber, index) => (
//               <div className="flex items-center gap-2 mb-2" key={index}>
//                 <input
//                   type="text"
//                   className="border rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
//                   placeholder="Phone Number"
//                   value={phoneNumber}
//                   onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
//                 />
//                 {index === phoneNumbers.length - 1 && (
//                   <button
//                     type="button"
//                     className="p-2 bg-[#0115fc] rounded-full text-white"
//                     onClick={handleAddPhoneNumber}
//                   >
//                     +
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
//           <button
//             type="button"
//             className="p-2 bg-[#0115fc] rounded-full text-white text-lg"
//             onClick={handleSubmit}
//           >
//             Submit
//           </button>
//           <div className="p-2 bg-[#0115fc] rounded-full text-white">
//             <GiConfirmed size={18} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyForm;


// import { GiConfirmed } from "react-icons/gi";

// const MyForm = () => {
//     return (
//         <div className="
//         m-20
//         border-[1px]
//         w-full
//         md:w-auto
//         py-2
//         rounded-full
//         shadow-sm
//         hover:shadow-md
//         transition
//         cursor-pointer
//         ">
//             <div className="flex flex-row items-center justify-between">

//                 <div className="hidden
//                 sm:block
//                 text-sm
//                 font-semibold
//                 px-6
//                 border-x-[1px]
//                 flex-1
//                 text-center
//                 ">
//                     {/* Date Field */}
//                     <div className="mb-2 text-center">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Date
//                         </label>
//                         <select className="appearance-none border rounded-full w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//                             <option>Today</option>
//                             <option>Tomorrow</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="hidden
//                 sm:block
//                 text-sm
//                 font-semibold
//                 px-6
//                 border-x-[1px]
//                 flex-1
//                 text-center
//                 ">
//                     {/* Time Field */}
//                     <div className="mb-2 text-center">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Time
//                         </label>
//                         <select className="appearance-none border rounded-full w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//                             <option>5 minutes from now</option>
//                             <option>15 minutes from now</option>
//                             <option>30 minutes from now</option>
//                             <option>60 minutes from now</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="hidden
//                 sm:block
//                 text-sm
//                 font-semibold
//                 px-6
//                 border-x-[1px]
//                 flex-1
//                 text-center
//                 items-center gap-3
//                 ">
//                     {/* Phone Numbers Field */}
//                     <div className="mb-2 text-center">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Add Your Buddies Phone Numbers
//                         </label>
//                         <input
//                             className="appearance-none border rounded-full w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             type="text"
//                             placeholder="Phone Numbers"
//                         />
//                     </div>
//                 </div>

//                 <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
//                     Send Invites to This List
//                     <div className="p-2 bg-[#0115fc] rounded-full text-white">
//                         <GiConfirmed size={18}/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MyForm;


// import React, { useState } from 'react';

// const TimeslotForm = () => {
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Select an Option</h2>

//       <div className="flex items-center mb-4">
//         <input
//           type="radio"
//           id="option1"
//           value="option1"
//           checked={selectedOption === 'option1'}
//           onChange={handleOptionChange}
//           className="mr-2"
//         />
//         <label htmlFor="option1">Option 1</label>
//       </div>

//       <div className="flex items-center mb-4">
//         <input
//           type="radio"
//           id="option2"
//           value="option2"
//           checked={selectedOption === 'option2'}
//           onChange={handleOptionChange}
//           className="mr-2"
//         />
//         <label htmlFor="option2">Option 2</label>
//       </div>

//       <div className="flex items-center mb-4">
//         <input
//           type="radio"
//           id="option3"
//           value="option3"
//           checked={selectedOption === 'option3'}
//           onChange={handleOptionChange}
//           className="mr-2"
//         />
//         <label htmlFor="option3">Option 3</label>
//       </div>

//       <p className="text-xl font-bold mt-4">Selected Option: {selectedOption}</p>
//     </div>
//   );
// };

// export default TimeslotForm;


// import React from 'react';

// const TimeSlots = ({ slots, onSlotClick }) => {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       {slots.map((slot, index) => (
//         <div
//           key={index}
//           className="bg-blue-500 p-4 rounded cursor-pointer"
//           onClick={() => onSlotClick(slot)}
//         >
//           {slot}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TimeSlots;



// import "./styles.css";
// import moment from "moment";
// export default function App() {
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//       <ReactTimeslotCalendar
//         initialDate={moment([2017, 3, 24]).format()}
//         let
//         timeslots={[
//           ["1", "2"], // 1:00 AM - 2:00 AM
//           ["2", "3"], // 2:00 AM - 3:00 AM
//           ["4", "6"], // 4:00 AM - 6:00 AM
//           "5", // 5:00 AM
//           ["4"] // 4:00 AM - 6:00 AM - 7:00AM - 8:00AM
//         ]}
//       />
//     </div>
//   );
// }


// import React, { useState } from 'react';

// const TimeSlotComponent = () => {
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   const handleSlotSelect = (slot) => {
//     setSelectedSlot(slot);
//     // Add your custom logic here when a slot is selected
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-4">
//       <TimeSlots
//         initialSelection={selectedSlot}
//         onSlotSelect={handleSlotSelect}
//       />
//     </div>
//   );
// };

// export default TimeSlotComponent;


// import React, { useState } from 'react';

// const TimeSlotComponent = () => {
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   const handleSlotSelect = (slot) => {
//     setSelectedSlot(slot);
//     // Add your custom logic here when a slot is selected
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-4">
//       <TimeSlots
//         initialSelection={selectedSlot}
//         onSlotSelect={handleSlotSelect}
//       />
//     </div>
//   );
// };

// export default TimeSlotComponent;


// import React, { useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import moment from 'moment';

// const localizer = momentLocalizer(moment);

// const CalendarComponent = () => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     // Add your custom logic here when the date changes
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-4">
//         timeslots here, but only make it the timeslots for the selected date and for only the next few hours. I should also start to think about adding these entries to the database.
//       {/* <Calendar
//         localizer={localizer}
//         defaultView="week"
//         views={['week']}
//         step={30}
//         timeslots={2}
//         defaultDate={new Date()}
//         onSelectEvent={handleDateChange}
//       /> */}
//     </div>
//   );
// };

// export default CalendarComponent;


// import React, { useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import moment from 'moment';

// const localizer = momentLocalizer(moment);

// const CalendarComponent = () => {
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const events = [
//     {
//       title: 'Meeting',
//       start: new Date(2023, 8, 13, 10, 0),
//       end: new Date(2023, 8, 13, 10, 30),
//     },
//     // Add more events as needed...
//   ];

//   const handleEventSelect = (event) => {
//     setSelectedEvent(event);
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-4">
//       <Calendar
//         localizer={localizer}
//         events={events}
//         defaultView="week"
//         views={['week']}
//         step={30}
//         timeslots={2}
//         defaultDate={new Date()}
//         onSelectEvent={handleEventSelect}
//       />

//       {selectedEvent && (
//         <div className="mt-4">
//           <h3>Selected Event</h3>
//           <p>Title: {selectedEvent.title}</p>
//           <p>Start Time: {selectedEvent.start.toLocaleString()}</p>
//           <p>End Time: {selectedEvent.end.toLocaleString()}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CalendarComponent;


// // "use client"

// // import React from 'react';
// // import { Calendar, momentLocalizer } from 'react-big-calendar';
// // import 'react-big-calendar/lib/css/react-big-calendar.css';
// // import moment from 'moment';

// // const localizer = momentLocalizer(moment);

// // const events = [
// //   {
// //     title: 'Meeting',
// //     start: new Date(2023, 8, 13, 10, 0), // September is month 8
// //     end: new Date(2023, 8, 13, 10, 30),
// //   },
// //   // Add more events as needed...
// // ];

// // const Timeslots = () => {
// //   return (
// //     <div className="max-w-2xl mx-auto mt-10 p-4">
// //       <Calendar
// //         localizer={localizer}
// //         events={events}
// //         defaultView="week"
// //         views={['week']}
// //         step={30}
// //         timeslots={2}
// //         defaultDate={new Date()}
// //       />
// //     </div>
// //   );
// // };

// // export default Timeslots;
