// pages/api/receive_sms/smsWebhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import io from "socket.io-client";
const socket = io("https://ride-buddy-listener-1b976fe0b164.herokuapp.com:15353");
import prisma from '@/app/libs/prismadb';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioClient = twilio(accountSid, authToken);

console.log("FIRST BLOCK")
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // console.log('Webhook: ', Math.floor(Date.now() / 1000));
    const incomingMessage = req.body.Body;
    const num = req.body.From;
    const phoneNumber = num;
    const timeslotId = parseInt(incomingMessage.replace(/\D/g, ''), 10);
    const timeslotClaimedName = incomingMessage.replace(/[^a-zA-Z\s]/g, '').trim();
    socket.emit('new-message', {slotId: timeslotId, claimedName: timeslotClaimedName, phoneNumber: phoneNumber});

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

        await twilioClient.messages.create({
          body: `${phoneNumber} successfully claimed the timeslot ${timeslot.id} - have a good chat!`,
          from: twilioPhoneNumber,
          to: timeslot.email || '6035488033',
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
      if (error instanceof Error) {
        console.error("Error:", error.message);
        res.status(500).send(error.message);
      } else {
        // Handle the error as an `unknown` type or rethrow it
        console.error("An unknown error occurred:", error);
        res.status(500).send("An unknown error occurred.");
      }
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
