import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import twilio from "twilio";
import { DateTime, IANAZone } from "luxon";

interface TimeSlot {
  email: string;
  userId: string;
  orderedId: number;
  startTime: Date;
  endTime: Date;
  phoneNumbers: string;
  timezone: string;
}

function convertToUserTimezone(utcTimestamp: string, timezone: string) {
  const dt = DateTime.fromISO(utcTimestamp).setZone(timezone);
  const formattedTime = dt.toLocaleString(DateTime.TIME_24_SIMPLE);
  const zoneAbbreviation = dt.toFormat("ZZZZ").split(" ").pop();
  return `${formattedTime.toLowerCase()} ${zoneAbbreviation}`;
}

function generateTimeSlots(
  availabilityStart: Date,
  availabilityEnd: Date,
  duration: number,
  email: string,
  userId: string,
  phoneNumbers: string[],
  timezone: string,
): TimeSlot[] {
  console.log("generateTimeSlots - Input values:");
  console.log("availabilityStart:", availabilityStart);
  console.log("availabilityEnd:", availabilityEnd);
  console.log("duration:", duration);
  console.log("email:", email);
  console.log("userId:", userId);
  console.log("phoneNumbers:", phoneNumbers);

  const timeSlots: TimeSlot[] = [];
  let currentSlotStart = new Date(availabilityStart);
  let slotsEnd = new Date(availabilityEnd);
  let orderedId = 1;

  console.log("Entering generateTimeSlots loop");
  console.log("currentSlotStart:", currentSlotStart);
  console.log("availabilityEnd:", availabilityEnd);
  console.log('will run?', currentSlotStart < availabilityEnd);
  // console.log('timezone', timezone);
  while (currentSlotStart < slotsEnd) {
    const currentSlotEnd = new Date(currentSlotStart);
    currentSlotEnd.setMinutes(currentSlotEnd.getMinutes() + duration);

    // Log values for debugging
    console.log("Current Slot Start:", currentSlotStart.toISOString());
    console.log("Current Slot End:", currentSlotEnd.toISOString());

    // Push the time slot into the array
    let ts = {
      orderedId,
      startTime: new Date(currentSlotStart),
      endTime: new Date(currentSlotEnd),
      email,
      userId,
      phoneNumbers: JSON.stringify(phoneNumbers),
      timezone
      
    }
    timeSlots.push(ts);
    console.log('ts', ts)

    // Update the current start time for the next slot
    currentSlotStart = new Date(currentSlotEnd);
    orderedId++;
  }

  console.log("Exiting generateTimeSlots loop");

  if (timeSlots.length === 0) {
    console.log("No time slots generated!");
  } else {
    console.log(`Generated ${timeSlots.length} time slots.`);
  }

  return timeSlots;
}


async function insertIntoDatabaseInParallel(
  slots: TimeSlot[],
  email: string,
  userId: string,
  availabilityPosting: any,
  currentUser: any
) {
  const insertionPromises = slots.map(async (slot) => {
    console.log("Timeslot creating:");
    const createdTimeSlot = await prisma.timeslot.create({
      data: {
        email,
        startTime: slot.startTime,
        endTime: slot.endTime,
        orderedId: slot.orderedId,
        phoneNumbersOfferedTo: slot.phoneNumbers,
        timezone: slot.timezone,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
        availabilityPosting: {
          connect: {
            id: availabilityPosting.id,
          },
        },
      },
    });
    return {
      uuid: createdTimeSlot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
    };
  });
  const createdTimeSlots = await Promise.all(insertionPromises);
  return createdTimeSlots;
}

export async function POST(request: Request) {
  console.log("First block of create listing route");

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const userId = currentUser.id.toString();
    const email = currentUser.email.toString();
    const body = await request.json();

    var {
      availabilityStart,
      availabilityEnd,
      date,
      duration,
      phoneNumbers,
      timezone,
    } = body;

    const availabilityPosting = await prisma.availabilityPosting.create({
      data: {
        email,
        availabilityStart,
        availabilityEnd,
        duration,
        phoneNumbers,
        timezone,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    console.log("availabilityStart:", availabilityStart);
    console.log("availabilityEnd:", availabilityEnd);
    console.log("duration:", duration);
    console.log("email:", email);
    console.log("userId:", userId);
    console.log("phoneNumbers:", phoneNumbers);

    const timeSlots = generateTimeSlots(
      availabilityStart,
      availabilityEnd,
      duration,
      email,
      userId,
      phoneNumbers, 
      timezone
    );

    console.log("timeSlots:", timeSlots);

    const createdTimeSlots = await insertIntoDatabaseInParallel(
      timeSlots,
      email,
      userId,
      availabilityPosting,
      currentUser
    );

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    const client = twilio(accountSid, authToken);

    var slotStr = "";

    createdTimeSlots.forEach((slot) => {
      try {
        console.log("Trying timeslot created:", slot);
        slotStr += `Reply ${slot.uuid}: ${convertToUserTimezone(slot.startTime.toISOString(), slot.timezone)} - ${convertToUserTimezone(slot.endTime.toISOString(), slot.timezone)}\n`;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error Creating Timeslot:", error.message);
        } else {
          console.error("An unknown error occurred");
        }
      }
    });

    slotStr += `Reply 0 to tell 'em to kick rocks!\n\nReply with the # and your name to claim a slot!\ne.g. "123 - Chris Keating"`;

    for (const num of JSON.parse(phoneNumbers)) {
      try {
        const message = await client.messages.create({
          body: `Hello from Chat Signal! ${currentUser.name} is about to be available for a phone call from ${convertToUserTimezone(
            availabilityStart.toString(),
            timezone
          )} to ${convertToUserTimezone(
            availabilityEnd.toString(),
            timezone
          )} for time slots of ${duration} - do you want to chat with them? Claim a slot below:\n\n${slotStr}`,
          from: twilioPhoneNumber,
          to: num,
        });
        console.log(`SUCCESS Message sent with ID: ${message.sid}`);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error Sending Availability Posting SMS:", error.message);
        } else {
          console.error("An unknown error occurred");
        }
        console.log(`FAIL Failed to send message: ${error}`);
      }
    }

    return NextResponse.json({ availabilityPosting, createdTimeSlots });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.error();
  }
}


// import { NextResponse } from "next/server";
// import prisma from '@/app/libs/prismadb';
// import getCurrentUser from "@/app/actions/getCurrentUser";
// import twilio from 'twilio';
// import { DateTime, IANAZone } from 'luxon';

// interface TimeSlot {
//     email: string;
//     userId: string;
//     orderedId: number;
//     startTime: Date;
//     endTime: Date;
//     phoneNumbers: string;
// }

// function convertToUserTimezone(utcTimestamp: string, timezone: string) {
//   const dt = DateTime.fromISO(utcTimestamp).setZone(timezone);
//   const formattedTime = dt.toLocaleString(DateTime.TIME_24_SIMPLE);
//   const zoneAbbreviation = dt.toFormat('ZZZZ').split(' ').pop();
//   return `${formattedTime.toLowerCase()} ${zoneAbbreviation}`;
// }

// function generateTimeSlots(
//   availabilityStart: Date,
//   availabilityEnd: Date,
//   duration: number,
//   email: string,
//   userId: string,
//   phoneNumbers: string[]
// ): TimeSlot[] {
//   console.log('generateTimeSlots - Input values:');
//   console.log('availabilityStart:', availabilityStart);
//   console.log('availabilityEnd:', availabilityEnd);
//   console.log('duration:', duration);

//   const timeSlots: TimeSlot[] = [];
//   let currentSlotStart = new Date(availabilityStart);
//   let orderedId = 1;

//   console.log('Entering generateTimeSlots loop');
  
//   while (currentSlotStart < availabilityEnd) {
//       // Create a new time slot with the current start time
//       const currentSlotEnd = new Date(currentSlotStart);
//       currentSlotEnd.setMinutes(currentSlotEnd.getMinutes() + duration);

//       // Push the time slot into the array
//       timeSlots.push({
//           orderedId,
//           startTime: new Date(currentSlotStart),
//           endTime: currentSlotEnd,
//           email,
//           userId,
//           phoneNumbers: JSON.stringify(phoneNumbers),
//       });

//       // Update the current start time for the next slot
//       currentSlotStart = new Date(currentSlotEnd); // Update currentSlotStart using currentSlotEnd
//       orderedId++;

//       // Log values for debugging
//       console.log('Current Slot Start:', currentSlotStart.toISOString());
//       console.log('Current Slot End:', currentSlotEnd.toISOString());
//       console.log('TimeSlots:', timeSlots);
//   }

//   console.log('Exiting generateTimeSlots loop');
  
//   return timeSlots;
// }



// async function insertIntoDatabaseInParallel(
//     slots: TimeSlot[],
//     email: string,
//     userId: string,
//     availabilityPosting: any, // Adjust the type as needed
//     currentUser: any // Adjust the type as needed
// ) {
//     const insertionPromises = slots.map(async (slot) => {
//         console.log('Timeslot creating:');
//         const createdTimeSlot = await prisma.timeslot.create({
//             data: {
//                 email,
//                 startTime: slot.startTime,
//                 endTime: slot.endTime,
//                 orderedId: slot.orderedId,
//                 phoneNumbersOfferedTo: slot.phoneNumbers,
//                 user: {
//                     connect: {
//                         id: currentUser.id
//                     }
//                 },
//                 availabilityPosting: {
//                     connect: {
//                         id: availabilityPosting.id
//                     }
//                 }
//             },
//         });
//         return {
//             uuid: createdTimeSlot.id,
//             startTime: slot.startTime,
//             endTime: slot.endTime,
//         };
//     });
//     const createdTimeSlots = await Promise.all(insertionPromises);
//     return createdTimeSlots;
// }

// export async function POST(
  
//     request: Request,
// ) {
//     console.log('First block of create listing route');

//     try {
//         // Fetch the current user
//         const currentUser = await getCurrentUser();
//         if (!currentUser) {
//             return NextResponse.error();
//         }

//         const userId = currentUser.id.toString();
//         const email = currentUser.email.toString();
//         const body = await request.json();

//         var {
//             availabilityStart,
//             availabilityEnd,
//             date,
//             duration,
//             phoneNumbers,
//             timezone
//         } = body;

//         const availabilityPosting = await prisma.availabilityPosting.create({
//             data: {
//                 email,
//                 availabilityStart,
//                 availabilityEnd,
//                 duration,
//                 phoneNumbers,
//                 user: {
//                     connect: {
//                         id: currentUser.id
//                     }
//                 }
//             }
//         });
//         console.log('availabilityStart:', availabilityStart);
// console.log('availabilityEnd:', availabilityEnd);
// console.log('duration:', duration);
// console.log('email:', email);
// console.log('userId:', userId);
// console.log('phoneNumbers:', phoneNumbers);

// const timeSlots1 = generateTimeSlots(
//     availabilityStart,
//     availabilityEnd,
//     duration,
//     email,
//     userId,
//     phoneNumbers
// );

// console.log('timeSlots:', timeSlots1); // Add this line to check the generated time slots

// // ... Rest of the code


//         const accountSid = process.env.TWILIO_ACCOUNT_SID;
//         const authToken = process.env.TWILIO_AUTH_TOKEN;
//         const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
//         const client = twilio(accountSid, authToken);

//         const timeSlots = generateTimeSlots(
//             availabilityStart,
//             availabilityEnd,
//             duration,
//             email,
//             userId,
//             phoneNumbers
//         );

//         var slotStr = '';

//         const createdTimeSlots = await insertIntoDatabaseInParallel(
//             timeSlots,
//             email,
//             userId,
//             availabilityPosting,
//             currentUser
//         );

//         createdTimeSlots.forEach((slot) => {
//             try {
//                 console.log('Trying timeslot created:', slot);
//                 slotStr += `Reply ${slot.uuid}: ${convertToUserTimezone(slot.startTime.toString(), timezone)} - ${convertToUserTimezone(slot.endTime.toString(), timezone)}\n`;
//             } catch (error) {
//                 if (error instanceof Error) {
//                     console.error('Error Creating Timeslot:', error.message);
//                 } else {
//                     console.error('An unknown error occurred');
//                 }
//             }
//         });

//         slotStr += `Reply 0 to tell 'em to kick rocks!\n\nReply with the # and your name to claim a slot!\ne.g. "123 - Chris Keating"`;

//         for (const num of JSON.parse(phoneNumbers)) {
//             try {
//                 const message = await client.messages.create({
//                     body: `Hello from Chat Signal! ${currentUser.name} is about to be available for phone call from ${convertToUserTimezone(availabilityStart.toString(), timezone)} to ${convertToUserTimezone(availabilityEnd.toString(), timezone)} for timeslots of ${duration} - do you want to chat with them? Claim a slot below:\n\n${slotStr}`,
//                     from: twilioPhoneNumber,
//                     to: num,
//                 });
//                 console.log(`SUCCESS Message sent with ID: ${message.sid}`);
//             } catch (error) {
//                 if (error instanceof Error) {
//                     console.error('Error Sending Availability Posting SMS:', error.message);
//                 } else {
//                     console.error('An unknown error occurred');
//                 }
//                 console.log(`FAIL Failed to send message: ${error}`);
//             }
//         }

//         return NextResponse.json({ availabilityPosting, createdTimeSlots });
//     } catch (error) {
//         console.error('An error occurred:', error);
//         return NextResponse.error();
//     }
// }