https://youtu.be/c_-b_isI4vg?si=ELBUeI8H7oLSQaNe&t=2072

## Getting Started

First, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To Do - V2
- reset form on submit click
- re-render table whenever slotClaimedPhoneNumber is updated 
- have a think about time zones - to start, I think we will do either EST or PST, but longer term, I want to think about how I could handle this in a more sophisticated way
- show all past tables for the user, ordered by when the request was sent
- add an invite message after the claimed time slot is complete, and to get feedback on the product

To Do - V3
- make invite visible on mobile
- if modal is open (login, invite, burger menu), click elsewhere on page closes modal
- automatically login when you sign up
- switching email field name to phone number
- Google Auth
- be able to name buttons, right now this is kinda hacked together

Done
- process inbound text messages from guests in order to have those users claim slots
- send text to original form submitter 
- check listener and update port 4000 to heroku remote server
- format times in table
- grey out the form while loading instead of just waiting for "invite success" message - actually I need to prioritize this, as this throws a weird status 0 error
- separate getCurrentUser from navbar load, which means we need to re-render specific portions of the navbar
    - maybe show the overall navbar on load and then populate the details 
- push this to a server and website
- update invite link to go to website
- First text not processing on front end, only on second and subsequent texts 
- buy a web domain
- send follow up that a slot has been claimed to everyone else
- Multiple servers started, port already in use
- receive texts and post in interface
- auth
- invite functionality
- switch out MongoDB for MySQL
- update time zones in the texts