https://youtu.be/c_-b_isI4vg?si=ELBUeI8H7oLSQaNe&t=2072

To Do - MVP
- re-render table whenever slotClaimedPhoneNumber is updated 
- push this to a server and website
- update invite link to go to website
- separate getCurrentUser from navbar load, which means we need to re-render specific portions of the navbar
    - maybe show the overall navbar on load and then populate the details 
- show all past tables for the user, ordered by when the request was sent

To Do - Next
- grey out the form while loading instead of just waiting for "invite success" message - actually I need to prioritize this, as this throws a weird status 0 error
- process inbound text messages from guests in order to have those users claim slots
- automatically login when you sign up
- switching email field name to phone number
- Google Auth
- be able to name buttons, right now this is kinda hacked together
- add an invite message after the claimed time slot is complete, and to get feedback on the product
- have a think about time zones - to start, I think we will do either EST or PST, but longer term, I want to think about how I could handle this in a more sophisticated way
- if modal is open (login, invite, burger menu), click elsewhere on page closes modal
- make invite visible on mobile
- reset form on submit click

Done
- First text not processing on front end, only on second and subsequent texts 
- buy a web domain
- send follow up that a slot has been claimed to everyone else
- Multiple servers started, port already in use
- receive texts and post in interface
- auth
- invite functionality
- switch out MongoDB for MySQL
- update time zones in the texts

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
