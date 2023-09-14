// // utils/sendSMS.js

// const twilio = require('twilio');

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// export default async function sendSMS(to, message) {
//   try {
//     await client.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: to,
//     });

//     console.log(`SMS sent to ${to}: ${message}`);
//     return true;
//   } catch (error) {
//     console.error('Error sending SMS:', error.message);
//     return false;
//   }
// }

// module.exports = sendSMS;

// import twilio from 'twilio';

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// const client = twilio(accountSid, authToken);

// export async function sendSMS(phoneNumber: string, message: string) {
//   try {
//     await client.messages.create({
//       body: message,
//       from: twilioPhoneNumber,
//       to: phoneNumber,
//     });

//     return { success: true, message: 'SMS sent successfully' };
//   } catch (error) {
//     console.error('Error sending SMS:', error.message);
//     return { success: false, message: 'Failed to send SMS' };
//   }
// }


// app/utils/sendSMS.ts

import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function sendSMS(phoneNumber: string, message: string) {
  try {
    await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    return { success: true, message: 'SMS sent successfully' };
  } catch (error) {
    console.error('Error sending SMS:', error.message);
    return { success: false, message: 'Failed to send SMS' };
  }
}
