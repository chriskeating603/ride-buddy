'use client'

import React, { useEffect, useState } from "react";
import { SafeUser } from "@/app/types";
import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  // Create a local state to hold the current user
//   const [localUser, setLocalUser] = useState<SafeUser | null>(null);

  // Dummy user for logged-out state
//   const dummyUser: SafeUser = {
//     id: "dummy",
//     name: "Guest",
    // Add other properties that your SafeUser type might have
//   };

//   useEffect(() => {
//     // If currentUser is passed, update localUser
//     if (currentUser) {
//       setLocalUser(currentUser);
//     } else {
//       // Otherwise, set to dummy user
//       setLocalUser(dummyUser);
//     }
//   }, [currentUser]);

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <div className="md:text-semibold lg:text-bold">Chat Signal</div>
            {/* <Search /> */}
            <UserMenu currentUser={currentUser} />
            {/* <UserMenu currentUser={localUser} /> */}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;


// import { User } from "@prisma/client";
// import Container from "../Container";
// import Logo from "./Logo";
// import Search from "./Search";
// import UserMenu from "./UserMenu";
// import { SafeUser } from "@/app/types";

// interface NavbarProps {
//     currentUser?: SafeUser | null;
// }
// const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
//     // console.log({currentUser})
//     return (
//         <div className="fixed w-full bg-white z-10 shadow-sm">
//             <div className="py-4 border-b-[1px]">
//             <Container> 
            
//                 <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
//                 <Logo />
//                 <div className="md:text-semibold lg:text-bold">Chat Signal</div>
//                 {/* <Search /> */}
//                 <UserMenu currentUser={currentUser} />
//                 </div>
                
//             </Container>
            
//             </div>
//         </div>
//     ); 
// } 

// export default Navbar;