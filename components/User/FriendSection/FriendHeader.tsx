import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineMarkChatUnread } from "react-icons/md";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { MdMenuOpen } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";
import { HiInbox } from "react-icons/hi";
import { BiHelpCircle } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { useDrawer } from "@/hooks/use-drawer-store";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
interface FriendHeaderProps {
    setActive: (active: number) => void;
    active: number
}
const FriendHeader = ({ active, setActive }: FriendHeaderProps) => {
    const {onOpen} =useDrawer();
    return (
        <div className="dark:bg-[#313338] bg-white border-b border-gray-300 dark:border-black px-5 max-[1040px]:pr-2  py-3 w-full  h-12 flex items-center ">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <MdMenuOpen onClick={()=>onOpen("openFriendsDrawer")} className="text-[2rem] block lg:hidden mr-5" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Open Drawer</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <div className="flex gap-2 justify-between items-center">
                <FaUserFriends className="text-gray-400 w-6 h-6" />
                <span className="dark:text-white max-[840px]:hidden flex text-black font-medium">Friends</span>
            </div>
            <div className="flex ml-5 px-5 w-full justify-between items-center border-r-2  border-l-2 border-gray-500 mr-5 ">
                <Popover>
                    <PopoverTrigger>
                        <CgMenuGridR className="text-lg max-[780px]:flex hidden"/>
                    </PopoverTrigger>
                    <PopoverContent>
                    <li onClick={() => setActive(0)} className={cn("dark:text-gray-300 text-black  cursor-pointer px-2 rounded-md py-[1px] ", active === 0 && "bg-[#43444B] text-white")}>
                        Online
                    </li>
                    <li onClick={() => setActive(1)} className={cn("dark:text-gray-300 text-black  cursor-pointer px-2 rounded-md py-[1px] ", active === 1 && "bg-[#43444B] text-white")}>
                        All
                    </li>
                    <li onClick={() => setActive(2)} className={cn("dark:text-gray-300 text-black cursor-pointer  px-2 rounded-md py-[1px] ", active === 2 && "bg-[#43444B]  text-white")}>
                        Pending
                    </li>
                    <li onClick={() => setActive(3)} className={cn("dark:text-gray-300 text-black  cursor-pointer px-2 rounded-md py-[1px] ", active === 3 && "bg-[#43444B] text-white")}>
                        Block
                    </li>
                    <li onClick={() => setActive(4)} className={cn(" cursor-pointer text-[#248046] font-semibold px-3  py-[1px] rounded-md", active === 4 && "bg-[#248046] text-white")}>
                        Add Friend
                    </li>
                    </PopoverContent>
                </Popover>
                <ul className=" max-[780px]:hidden select-none flex space-x-5 items-center ">
                    <li onClick={() => setActive(0)} className={cn("dark:text-gray-300 text-black cursor-pointer px-2 rounded-md py-[1px] ", active === 0 && "bg-[#43444B]  text-white")}>
                        Online
                    </li>
                    <li onClick={() => setActive(1)} className={cn("dark:text-gray-300 text-black  cursor-pointer px-2 rounded-md py-[1px] ", active === 1 && "bg-[#43444B] text-white")}>
                        All
                    </li>
                    <li onClick={() => setActive(2)} className={cn("dark:text-gray-300 text-black  cursor-pointer px-2 rounded-md py-[1px] ", active === 2 && "bg-[#43444B] text-white")}>
                        Pending
                    </li>
                    <li onClick={() => setActive(3)} className={cn("dark:text-gray-300 text-black  cursor-pointer px-2 rounded-md py-[1px] ", active === 3 && "bg-[#43444B] text-white")}>
                        Block
                    </li>
                    <li onClick={() => setActive(4)} className={cn(" cursor-pointer text-[#248046] font-semibold px-3  py-[1px] rounded-md", active === 4 && "bg-[#248046] text-white")}>
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
