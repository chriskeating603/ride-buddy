import { NextResponse } from "next/server";
// import { Prisma } from "@/app/actions/prismasd";   
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";
import twilio from 'twilio';

export async function POST (
    request: Request, 
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error()
    };
    const body = await request.json();
    const { name, phoneNumber } = body;

    // Object.keys(body).forEach((value: any) => {
    //     if (!body[value]) {
    //         return NextResponse.error(400)
    //     }
    // })

    const invite = await prisma.invite.create({
        data: {
            name,
            phoneNumber,
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

    try {
      await client.messages.create({
        body: `Hey ${body.funnyName}, ${currentUser.name} is inviting you to join Chat Signal: https://ride-buddy.vercel.app/`,
        from: twilioPhoneNumber,
        to: phoneNumber,
      });
      console.log('SMS sent successfully');
    //   return { success: true, message: 'SMS sent successfully' };
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error sending SMS:', error.message);
        } else {
            console.error('An unknown error occurred');
        }
        // return { success: false, message: 'Failed to send SMS' };
    }

    // console.log(invite)
    return NextResponse.json(invite)

}