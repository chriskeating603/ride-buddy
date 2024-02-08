'use client'

import { GiConfirmed } from "react-icons/gi";

const Search = () => {
    return (
        <div className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
        ">
            <div className="flex flex-row items-center justify-between">

                {/* <div className="text-sm font-semibold px-6"> */}
                <div className="hidden
                sm:block
                text-sm
                font-semibold
                px-6
                border-x-[1px]
                flex-1
                text-center
                ">
                    Date?
                </div>
                <div className="hidden
                sm:block
                text-sm
                font-semibold
                px-6
                border-x-[1px]
                flex-1
                text-center
                ">
                    Timeslot?
                </div>
                <div className="hidden
                sm:block
                text-sm
                font-semibold
                px-6
                border-x-[1px]
                flex-1
                text-center
                items-center gap-3
                ">
                    Add Your Buddy&apos;s Phone Numbers
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                Send Invites to This List
                    <div className="p-2 bg-[#0115fc] rounded-full text-white">
                        <GiConfirmed size={18}/>
                    </div>
                </div>
            </div>
        </div>
        

      );
}
 
export default Search;