'use client'

import React from 'react';

const TimeSlots = ({ slots, onSlotClick }) => {
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

const TimeSlotComponent = () => {
  const timeSlots = [
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
    <TimeSlots slots={timeSlots} onSlotClick={handleSlotClick} />
  );
};

export default TimeSlotComponent;


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
// import ReactTimeslotCalendar from "react-timeslot-calendar";
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
// import { TimeSlots } from 'react-timeslots';

// import 'react-timeslots/dist/index.css'; // Import the CSS from the package

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
// import { TimeSlots } from 'react-timeslots';
// import 'react-timeslots/dist/style.css';

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
