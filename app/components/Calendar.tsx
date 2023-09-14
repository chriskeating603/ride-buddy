'use client'

// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// import 'tailwindcss/tailwind.css'; // Make sure Tailwind CSS is properly configured

// const CalendarComponent = () => {
//   const [startDate, setStartDate] = useState(new Date());

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-4">
//       <DatePicker
//         selected={startDate}
//         onChange={(date) => setStartDate(date)}
//         className="border p-2 rounded shadow"
//       />
//     </div>
//   );
// };

// export default CalendarComponent;


import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import ReactTimeslotCalendar from "react-timeslot-calendar";
// import moment from "moment";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    console.log(newDate)
    setDate(newDate);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">

      
      <Calendar
        onChange={onChange}
        value={date}
        // className="border p-2 rounded shadow appearance-none bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
        className="border p-2 rounded shadow bg-white text-gray-700 selection:bg-grey-50 selection:text-gray-800"
        // .custom-calendar {
        //     background-color: #ffffff;
        //     color: #333333;
        //   }
          
        //   .react-calendar__tile--active {
        //     background: #4299e1;
        //     color: #ffffff;
        //   }



      />
      
        {/* <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
          <ReactTimeslotCalendar
            initialDate={moment([2017, 3, 24]).format()}
            let
            timeslots={[
              ["1", "2"], // 1:00 AM - 2:00 AM
              ["2", "3"], // 2:00 AM - 3:00 AM
              ["4", "6"], // 4:00 AM - 6:00 AM
              "5", // 5:00 AM
              ["4"] // 4:00 AM - 6:00 AM - 7:00AM - 8:00AM
            ]}
          />
        </div> */}
    </div>
  );
};

export default CalendarComponent;



// const Calendar = () => {
//     return ( 
//         <div>
//             Calendar
//         </div>
//      );
// }
 
// export default Calendar;