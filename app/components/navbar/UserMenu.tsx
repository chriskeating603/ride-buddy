'use client'

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState, useCallback, useEffect } from "react";
import MenuItem from "./MenuItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useInviteBuddiesModal from "@/app/hooks/useInviteBuddiesModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const inviteBuddiesModal = useInviteBuddiesModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => setIsOpen((value) => !value), []);

  const onInvite = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    inviteBuddiesModal.onOpen();
    console.log("Invite a buddy");
  }, [currentUser, loginModal, inviteBuddiesModal]);

  // Function to close the UserMenu when clicking outside of it
  const closeUserMenuOnOutsideClick = (e: MouseEvent) => {
    const userMenuButton = document.querySelector(".user-menu-button");
    if (isOpen && userMenuButton && !userMenuButton.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  // Attach an event listener to the window for click events
  useEffect(() => {
    window.addEventListener("click", closeUserMenuOnOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", closeUserMenuOnOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => onInvite()}
          className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
                text-[#0115fc]
                "
        >
          Invite Your Buddies
        </div>
        <div
          onClick={toggleOpen}
          className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
                
                user-menu-button" // Add a class for easy identification
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image || null} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                ">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="Buddy Lists (not set up yet)" />
                <MenuItem onClick={() => {}} label="Past Timeslots and Calls (not set up yet)" />
                <MenuItem onClick={() => {}} label="Monetization (not set up yet)" />
                <MenuItem onClick={() => signOut()} label="Log Out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;