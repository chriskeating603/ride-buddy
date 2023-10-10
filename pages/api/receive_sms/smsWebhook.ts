// pages/api/receive_sms/smsWebhook.ts

import { NextApiRequest, NextApiResponse } from 'next';
import io from "socket.io-client";
import prisma from '@/app/libs/prismadb';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioClient = twilio(accountSid, authToken);
const socketURL = process.env.REMOTE_SERVER
//  || 'http://localhost:4000';
// const socketURL = process.env.NODE_ENV === 'production' ? process.env.REMOTE_SERVER : process.env.LOCAL_SERVER;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Started process X at", new Date().toISOString());
  // console.log("Socket URL:", socketURL);
  // console.log('env', process.env.NODE_ENV)
  if (req.method !== 'POST') {
    return res.status(405).send("Method Not Allowed");
  }

  const incomingMessage = req.body.Body;
  const phoneNumber = req.body.From;
  const timeslotId = parseInt(incomingMessage.replace(/\D/g, ''), 10);
  const timeslotClaimedName = incomingMessage.replace(/[^a-zA-Z\s]/g, '').trim();

  if (isNaN(timeslotId)) {
    console.error("Invalid timeslot ID:", incomingMessage);
    return res.status(200).send("Invalid timeslot ID");
  }

  try {
    const timeslot = await prisma.timeslot.findUnique({
      where: { id: timeslotId },
    });

    if (!timeslot || timeslot.claimedUserPhoneNumber) {
      await twilioClient.messages.create({
        body: 'This timeslot is already claimed.',
        from: twilioPhoneNumber,
        to: phoneNumber,
      });
      console.error("Timeslot is already claimed or does not exist.");
      return res.status(200).send("Timeslot is already claimed or does not exist.");
    }

    // Update the timeslot in the database
    const updatedTimeslot = await prisma.timeslot.update({
      where: { id: timeslotId },
      data: { claimedUserPhoneNumber: phoneNumber },
    });

    // Emit the message via WebSocket after the DB operation
    const socket = io(socketURL || 'http://localhost:4000');
    // console.log("Socket URL right before socket emit:", socketURL);
    // console.log("Socket right before socket emit:", socket);
    socket.emit('new-message', {
      slotId: timeslotId,
      claimedName: timeslotClaimedName,
      phoneNumber: phoneNumber
    });
    
    console.log("Updated Timeslot:", updatedTimeslot);

    // Send a confirmation message to the user
    await twilioClient.messages.create({
      body: 'You have successfully claimed the timeslot.',
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    await twilioClient.messages.create({
      body: `${timeslotClaimedName} successfully claimed the timeslot ${timeslot.id}. Call them at ${phoneNumber} - have a good chat!`,
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

    res.status(200).send("Successfully processed SMS.");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return res.status(500).send(error.message);
    } else {
      console.error("An unknown error occurred:", error);
      return res.status(500).send("An unknown error occurred.");
    }
  }
}