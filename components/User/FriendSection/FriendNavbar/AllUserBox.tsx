import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { FiMessageSquare } from "react-icons/fi"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { HiOutlineDotsVertical } from "react-icons/hi"
const AllUserBox = () => {
  return (
    <div className="flex cursor-pointer hover:bg-[#f2f2f2] dark:hover:bg-[#404249] rounded-md justify-between group py-2 px-2 items-center">
      <div className="flex gap-2">
        <div className="relative">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 right-1 rounded-md w-3 h-3 bg-white " />
        </div>
        <div className="flex justify-center flex-col">
          <span className="dark:text-white text-gray-700 font-semibold">kritam</span>
          <span className="dark:text-gray-400 text-gray-500 text-sm">Offline</span>
        </div>
      </div>
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger> <button className="w-9 h-9 dark:group-hover:bg-[#1E1F22] group-hover:bg-[#ffff] rounded-full flex justify-center items-center text-gray-400 dark:bg-[#2B2D31] bg-[#e8e5e5] shadow-sm px-1 py-1">
              <FiMessageSquare className="text-gray-700 dark:text-white w-5 h-5 " />
            </button></TooltipTrigger>
            <TooltipContent>
              <p>Messages</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>


        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
            <button className="w-9 h-9 dark:group-hover:bg-[#1E1F22] group-hover:bg-[#ffff] rounded-full flex justify-center items-center text-gray-400 dark:bg-[#2B2D31] bg-[#e8e5e5] shadow-sm px-1 py-1">
              <HiOutlineDotsVertical className="text-gray-700 dark:text-white w-5 h-5 " />
            </button>
              </TooltipTrigger>
            <TooltipContent>
              <p>More</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>



      </div>
    </div>
  );
};

export default AllUserBox;
