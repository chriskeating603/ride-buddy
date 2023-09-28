import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";
import twilio from 'twilio';

function parseDateTime(dateString: string, timeString: string): Date | null {
    const now = new Date();

    // Convert timeString to hours and minutes
    const [hours, minutes] = timeString.split(':').map(Number);

    // Set the hours and minutes
    now.setHours(hours);
    now.setMinutes(minutes);

    // If dateString is "tomorrow", add one day
    if (dateString.toLowerCase() === 'tomorrow') {
        now.setDate(now.getDate() + 1);
    } else if (dateString.toLowerCase() !== 'today') {
        // If dateString is neither "today" nor "tomorrow", return null for invalid input
        return null;
    }

    return now;
}

function extractMinutesFromString(inputString: string): number | null {
    const match = inputString.match(/\d+/);
    if (match) {
        return parseInt(match[0], 10);
    }
    return null; // Return null if no integer is found
}

export async function POST (
    request: Request, 
) {
  // console.log('ZEROETH BLOCK')
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error(401)
    };
    const userId = currentUser.id.toString();
    const email = currentUser.email.toString();
    const body = await request.json();
    var { 
        availabilityStart,
        availabilityEnd, 
        date, 
        duration, 
        phoneNumbers,
    } = body;
    let availabilityStartStr = availabilityStart
    availabilityStart = parseDateTime(date, availabilityStart);
    let availabilityEndStr = availabilityEnd
    availabilityEnd = parseDateTime(date, availabilityEnd);
    let durationStr = duration
    duration = extractMinutesFromString(duration);
    let phoneNumbersArr = phoneNumbers
    phoneNumbers = phoneNumbers.toString();

      const availabilityPosting = await prisma.availabilityPosting.create({
        data: {
          email,
          availabilityStart,
          availabilityEnd, 
          duration, 
          phoneNumbers,
          user: {
              connect: {
                  id: currentUser.id
              }
          }
        }
      });
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    const client = twilio(accountSid, authToken);

    interface TimeSlot {
        // id: number;
        email: string;
        userId: string;
        orderedId: number;
        startTime: Date;
        endTime: Date;
        phoneNumbers: string;
      }
      
      function generateTimeSlots(availabilityStart: Date, availabilityEnd: Date, duration: number): TimeSlot[] {
        const timeSlots: TimeSlot[] = [];
        let currentSlotStart = new Date(availabilityStart);
        let orderedId = 1;
        while (currentSlotStart < availabilityEnd) {
          const currentSlotEnd = new Date(currentSlotStart);
          currentSlotEnd.setMinutes(currentSlotStart.getMinutes() + duration);
          if (currentSlotEnd > availabilityEnd) {
            currentSlotEnd.setTime(availabilityEnd.getTime());
          }
          timeSlots.push({
            orderedId,
            startTime: new Date(currentSlotStart),
            endTime: currentSlotEnd,
            email,
            userId,
            phoneNumbers: phoneNumbersArr.toString(),
            // id,
          });
          currentSlotStart = new Date(currentSlotEnd);
          orderedId++;
        }
        return timeSlots;
      }
    function convertUTCtoEST(utcTimestamp: string): string {
        const utcDate = new Date(utcTimestamp);
        const estOptions = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: '2-digit' };
        const pstOptions = { timeZone: 'America/Los_Angeles', hour12: true, hour: 'numeric', minute: '2-digit' };
        // return utcDate.toLocaleString('en-US', pstOptions).replace(/\s+/g, '');
        return utcDate.toLocaleString('en-US', pstOptions).replace(/\s+/g, '');
    }
      
      const timeSlots = generateTimeSlots(availabilityStart, availabilityEnd, duration);
      var slotStr = ''
    
    async function insertIntoDatabaseInParallel(slots) {
        const insertionPromises = slots.map(async (slot) => {
            console.log('Timeslot creating:');
            const createdTimeSlot = await prisma.timeslot.create({
                data: {
                    email,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                    orderedId: slot.orderedId,
                    phoneNumbersOfferedTo: slot.phoneNumbers,
                    user: {
                      connect: {
                        id: currentUser.id
                      }
                    },
                    availabilityPosting: {
                      connect: {
                        id: availabilityPosting.id
                      }
                    }
                },
            });
            // You can collect the information here
            return {
                uuid: createdTimeSlot.id,
                startTime: slot.startTime,
                endTime: slot.endTime,
            };
        });
        const createdTimeSlots = await Promise.all(insertionPromises);
        // Do something with `createdTimeSlots`, which is an array of objects containing UUID and time slot info
        // console.log('Created Time Slots:', createdTimeSlots);
        return createdTimeSlots; // Return the array if needed
    }
    const createdTimeSlots = await insertIntoDatabaseInParallel(timeSlots);
    
    createdTimeSlots.forEach((slot) => {
        try {
          slotStr += `Reply ${slot.uuid}: ${convertUTCtoEST(slot.startTime.toString())} - ${convertUTCtoEST(slot.endTime.toString())}\n`
        }
         catch (error) {
          console.error('Error Creating Timeslot:', error.message);
        }
      });

    slotStr += `Reply 0 to tell 'em to kick rocks!\n\nReply with the # and your name to claim a slot!\ne.g. "123 - Chris Keating"`
    // could check the phone number to see if we have a user with that phone number and add their name
    phoneNumbersArr.forEach((num:string) => {
        try {
            client.messages.create({
                body: `Hello from Ride Buddy! ${currentUser.name} is about to be available for phone call from ${convertUTCtoEST(availabilityStart)} to ${convertUTCtoEST(availabilityEnd)} PST, for timeslots of ${durationStr} - do you want to chat with them? Claim a slot below:\n\n${slotStr}`,
                from: twilioPhoneNumber,
                to: num,
            });
            console.log('Availability Posting SMS Sent');
        } catch (error) {
            console.error('Error Sending Availability Posting SMS:', error.message);
            // return { success: false, message: 'Failed to send SMS' };
        }
    })

    return NextResponse.json({ availabilityPosting, createdTimeSlots });
}