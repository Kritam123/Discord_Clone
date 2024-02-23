import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineMarkChatUnread } from "react-icons/md";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { HiInbox } from "react-icons/hi";
import { BiHelpCircle } from "react-icons/bi";
interface FriendHeaderProps{
    setActive:(active:number)=>void;
}
const FriendHeader = ({setActive}:FriendHeaderProps) => {
    return (
        <div className="dark:bg-[#313338] bg-white border-b border-gray-300 dark:border-black px-5 py-3 w-full  h-12 flex items-center ">
            <div className="flex gap-2 justify-between items-center">
                <FaUserFriends className="text-gray-400 w-6 h-6" />
                <span className="dark:text-white text-black font-medium">Friends</span>
            </div>
            <div className="flex ml-5 px-5 w-full justify-between items-center border-r-2  border-l-2 border-gray-500 mr-5 ">
                <ul className=" select-none flex space-x-5 items-center ">
                    <li onClick={()=>setActive(0)} className="text-gray-300  cursor-pointer px-2 rounded-md py-[1px] bg-[#43444B]">
                        Online
                    </li>
                    <li onClick={()=>setActive(1)} className="text-gray-300 cursor-pointer px-2 rounded-md py-[1px] bg-[#43444B]">
                        All
                    </li>
                    <li onClick={()=>setActive(2)} className="text-gray-300 cursor-pointer px-2 rounded-md py-[1px] bg-[#43444B]">
                        Pending
                    </li>
                    <li onClick={()=>setActive(3)} className="text-gray-300 cursor-pointer px-2 rounded-md py-[1px] bg-[#43444B]">
                        Block
                    </li>
                    <li onClick={()=>setActive(4)} className="bg-[#248046] cursor-pointer text-white px-3 py-[1px] rounded-md">
                        Add Friend
                    </li>
                </ul>
                <div className="flex justify-center items-center">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><button>
                                <MdOutlineMarkChatUnread className="text-black dark:text-white z-10 cursor-pointer w-6 h-6" />
                            </button></TooltipTrigger>
                            <TooltipContent>
                                <p>New Group DM</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>


                </div>
            </div>
            <div className="flex items-center space-x-3">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><button>
                            <HiInbox className="h-6 w-6 z-100 text-black dark:text-white cursor-pointer" />
                        </button></TooltipTrigger>
                        <TooltipContent>
                            <p>Inbox</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger> <button>
                            <BiHelpCircle className="text-gray-400 z-100 w-6 h-6 cursor-pointer" />
                        </button></TooltipTrigger>
                        <TooltipContent>
                            <p>Help</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>



            </div>
        </div>
    );
};

export default FriendHeader;
