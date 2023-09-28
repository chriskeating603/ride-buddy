import {Nunito} from "next/font/google"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from "./components/ClientOnly"
import Modal from './components/modals/Modal'
import RegisterModal from "./components/modals/RegisterModel"
import ToasterProvider from "./providers/ToasterProvider"
import LoginModal from "./components/modals/LoginModal"
import getCurrentUser from './actions/getCurrentUser.ts'
import InviteBuddies from "./components/modals/InviteBuddiesModal.tsx"
import Search from "./components/navbar/Search.tsx"
import Dates from "./components/Calendar.tsx"
import Timeslots from "./components/Timeslots.tsx"
import AvailabilityPostingForm from "./components/AvailabilityPostingForm.tsx"
import MessageListener from "./components/MessageListener.tsx"
import PreviousPostings from "./components/PreviousPostings.tsx"
import FormAndPostings from "./components/FormAndPostings.tsx"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ride Buddy',
  description: 'Connect with your friends while you ride',
}

const font = Nunito ({
  subsets: ['latin'],
})

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const currentUser = await getCurrentUser()
    // console.log(currentUser)
    return (
      <html lang="en">
        <body className={font.className}>
          <ClientOnly>
            <ToasterProvider />
            <InviteBuddies />
            <LoginModal />
            <RegisterModal />
            {/* <Modal title="Hello World" actionLabel='Submit' secondaryActionLabel='Login' isOpen /> */}
            {/* I don't want to wait for the currentUser to return, can I load the logged out user experience and then add that info in later? */}
            <Navbar currentUser={currentUser}/>
            {/* <Lists /> */}
          </ClientOnly>
          <div className="
          p-1">
            {/* <Search /> */}
            <FormAndPostings />
            {/* <AvailabilityPostingForm />
            <PreviousPostings /> */}
            <MessageListener />
            {/* <Dates />
            <Timeslots /> */}
            {/* {children} */}
          </div>
        </body>
      </html>
    )
  }
