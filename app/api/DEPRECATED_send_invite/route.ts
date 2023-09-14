// import { NextResponse } from "next/server";
// import { Prisma } from "@/app/actions/prismasd";   
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber, message } = req.body;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    const client = twilio(accountSid, authToken);

    try {
      await client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: phoneNumber,
      });

      res.status(200).json({ success: true, message: 'SMS sent successfully' });
    } catch (error) {
      console.error('Error sending SMS:', error.message);
      res.status(500).json({ success: false, message: 'Failed to send SMS' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}


// export async function POST (
//     request: Request, 
// ) {
//     const currentUser = await getCurrentUser();
//     if (!currentUser) {
//         return NextResponse.error(401)
//     };
//     const body = await request.json();
//     const { name, phoneNumber } = body;

//     // Object.keys(body).forEach((value: any) => {
//     //     if (!body[value]) {
//     //         return NextResponse.error(400)
//     //     }
//     // })

//     const invite = await prisma.invite.create({
//         data: {
//             name,
//             phoneNumber,
//             user: {
//                 connect: {
//                     id: currentUser.id
//                 }
//             }
//         }
//     });

    


//     return NextResponse.json(invite)

// }