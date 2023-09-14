// import { NextApiRequest, NextApiResponse } from 'next';
import sendSMS from '@/app/utils/DEPRECATED_sendSMS'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { phoneNumber, message } = req.body;

//     const result = await sendSMS(phoneNumber, message);

//     res.status(result.success ? 200 : 500).json(result);
//   } else {
//     res.status(405).json({ success: false, message: 'Method not allowed' });
//   }
// }

// pages/api/send-sms.ts

import { NextApiRequest, NextApiResponse } from 'next';
// import { sendSMS } from '../../utils/sendSMS';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber, message } = req.body;

    const result = await sendSMS(phoneNumber, message);

    res.status(result.success ? 200 : 500).json(result);
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
