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
    if (error instanceof Error) {
      console.error('Error sending SMS:', error.message);
      return { success: false, message: 'Failed to send SMS' };
    } else {
      console.error('An unknown error occurred:', error);
      return { success: false, message: 'An unknown error occurred while sending the SMS.' };
    }
  }
}
