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
          <Navbar currentUser={currentUser}/>
          {/* <Lists /> */}
        </ClientOnly>
      {children}
      </body>
    </html>
  )
}
