Sharing this repo/demo to show my background in coding. I put down this project in the middle of development, but you can [see a demo here](https://youtu.be/yCL1UCNWW-I). 

For a little bit around Chat Signal (and I named it as a reference to the Bat Signal, so you can let your friends know of your availability), here is a blurb: 

Chat Signal allows users to communicate their availability for spontaneous phone calls, encouraging conversations between friends that might not occur otherwise. A user can enter their upcoming availability, for example a 2-hour car ride, and that availability is broken up into 30-minute timeslots. Friends receive a text about the timeslots available and claim a slot by responding to the text message, and they receive a text reminder at the start of the timeslot.

This is a product that has been rolling around in my head for years - until building this, I would just call a bunch of people and no one would answer, and then they would call back later when I was no longer available.

Future versions aim to facilitate calls either between two individuals or between "pods," which are groups of friends or family members that can join an already ongoing phone call between other members of a "pod."

I started Chat Signal to make personal connection easier, but some commercial applications include: 1) social media influencers having short video calls with fans for e.g. $100 per 5-min slot, or 2) co-workers in larger organizations connecting for coffee chats/office hours to recreate some of the water cooler conversation that remote companies may be missing.

Still To Do
- Set up mixpanel
- set up recurring calls
- re-render table whenever slotClaimedPhoneNumber is updated 
- show all past tables for the user, ordered by when the request was sent
- load the rest of the page and don't wait to get all of the times async and fill it out later
- add an invite message after the claimed time slot is complete, and to get feedback on the product
- make invite visible on mobile
- switching email field name to phone number
- Google Auth
- be able to name buttons, right now this is kinda hacked together

Done
- update the order of the id for new timeslots
- if modal is open (login, invite, burger menu), click elsewhere on page closes modal
- automatically login when you sign up
- reset form on submit click
- Loading logo on submit
- update outbound text times
- have a think about time zones - to start, I think we will do either EST or PST, but longer term, I want to think about how I could handle this in a more sophisticated way
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

https://youtu.be/c_-b_isI4vg?si=ELBUeI8H7oLSQaNe&t=2072

## Getting Started

First, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.