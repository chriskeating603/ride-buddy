// pages/api/receive_sms/smsWebhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { io, httpServer } from '@/app/api/receive_sms/route.ts'; 
import prisma from '@/app/libs/prismadb'; // Adjust the path according to your folder structure
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioClient = twilio(accountSid, authToken);

console.log("FIRST BLOCK")
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Webhook: ', Math.floor(Date.now() / 1000));
    
    // console.log("SECOND BLOCK")
    // console.log("webhook firing");
    const incomingMessage = req.body.Body;
    const num = req.body.From;
    // io.emit('new-message', {'slot': incomingMessage, 'phoneNumber': num}); 
    
    // console.log("THIRD BLOCK")
    // Assume incomingMessage is the id of the timeslot
    const phoneNumber = num;
    // Remove any non-digit characters from incomingMessage
    // const cleanedMessage = ;
    // Convert the cleaned string to a number
    const timeslotId = parseInt(incomingMessage.replace(/\D/g, ''), 10);
    const timeslotClaimedName = incomingMessage.replace(/[^a-zA-Z\s]/g, '').trim();
    setTimeout(() => {
      io.emit('new-message', {slotId: timeslotId, claimedName: timeslotClaimedName, phoneNumber: phoneNumber});
  }, 2000); // delay for 1 seconds
    // io.emit('new-message', {slotId: timeslotId, claimedName: timeslotClaimedName, phoneNumber: phoneNumber}); 
    if (isNaN(timeslotId)) {
      console.error("Invalid timeslot ID:", incomingMessage);
      res.status(400).send("Invalid timeslot ID");
      return;
    }
    try {
      // First fetch the timeslot from the database
      const timeslot = await prisma.timeslot.findUnique({
        where: {
          id: timeslotId
        },
      });
    
      // Check if slotClaimedBy is empty
      if (timeslot && !timeslot.claimedUserPhoneNumber) {
        // Query and update the timeslot in the database
        const updatedTimeslot = await prisma.timeslot.update({
          where: {
            id: timeslotId
          },
          data: {
            claimedUserPhoneNumber: phoneNumber
          },
        });
        console.log("Updated Timeslot:", updatedTimeslot);
        // Send a confirmation message to the user
        await twilioClient.messages.create({
          body: 'You have successfully claimed the timeslot.',
          from: twilioPhoneNumber,
          to: phoneNumber,
        });
        // Notify other numbers that the timeslot has been claimed
        if (updatedTimeslot.phoneNumbersOfferedTo) {
          const otherNumbers = updatedTimeslot.phoneNumbersOfferedTo.split(',')
            .map(num => num.trim()) // remove any leading/trailing spaces
            .filter(num => num !== phoneNumber); // exclude the number that claimed the timeslot

          // Send notification to other numbers
          await Promise.all(otherNumbers.map(num => twilioClient.messages.create({
            body: `Timeslot ${updatedTimeslot.id} has been claimed by ${timeslotClaimedName ? timeslotClaimedName : phoneNumber}.`,
            from: twilioPhoneNumber,
            to: num,
          })));
        }
      } else {
        await twilioClient.messages.create({
          body: 'This timeslot is already claimed.',
          from: twilioPhoneNumber,
          to: phoneNumber,
        });
        console.error("Timeslot is already claimed or does not exist.");
        res.status(400).send("Timeslot is already claimed or does not exist.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send(error.message);
    }
    // io.emit('new-message', {slotId: timeslotId, claimedName: timeslotClaimedName, phoneNumber: phoneNumber}); 
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
  //   try {
  //     // Query and update the timeslot in the database
  //     console.log("FOURTH BLOCK")
  //     const updatedTimeslot = await prisma.timeslot.update({
  //       where: {
  //         id: timeslotId
  //       },
  //       data: {
  //         claimedUserPhoneNumber: phoneNumber
  //       },
  //     });
  //     console.log("FIFTH BLOCK")
  //     console.log("Updated Timeslot:", updatedTimeslot);
  //   } catch (error) {
  //     console.error("Error updating timeslot:", error.message);
  //   }
  //   console.log("SIXTH BLOCK")
  //   res.status(200).send(`${incomingMessage} from ${num}`);
  // } else {
  //   console.log("SEVENTH BLOCK")
  //   res.status(405).end();
  // }
  


// // pages/api/receive_sms/smsWebhook.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { io, httpServer } from '@/app/api/receive_sms/route.ts'; // Adjust the path according to your folder structure

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     console.log("webhook firing");
//     // console.log(req.body);
//     const incomingMessage = req.body.Body;
//     const num = req.body.From;
//     // io.emit('new-message', `${incomingMessage} from ${num}`); 
//     io.emit('new-message', {'slot': incomingMessage, 'phoneNumber': num}); 
//     res.status(200).send(`${incomingMessage} from ${num}`);
//   } else {
//     res.status(405).end();
//   }
// }