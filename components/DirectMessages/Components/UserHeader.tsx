'use client'
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { BiHelpCircle, BiSearch } from "react-icons/bi";
import { FaPhoneVolume } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { HiInbox } from "react-icons/hi";
import { RxAvatar } from "react-icons/rx";
import { BsFillCameraVideoFill, BsFillPinAngleFill } from "react-icons/bs";
import clsx from "clsx";
import { MdOutlineClose } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const UserHeader = () => {
  const [value, setValue] = useState("");
  return (
    <div className="bg-[#313338] justify-between border-b border-black px-5 py-3 w-full  h-12 flex items-center ">
      <div className="flex gap-2 justify-between items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-white font-medium">sherya</span>
      </div>
      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <button>
                <FaPhoneVolume className="h-5 w-5 z-100 text-gray-400 cursor-pointer" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Start Voice Call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
            <button>
            <BsFillCameraVideoFill className="h-5 w-5 z-100 text-gray-400 cursor-pointer" />
          </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Start Video Call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
            <button>
            <BsFillPinAngleFill className="h-5 w-5 z-100 text-gray-400 cursor-pointer" />
          </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Pinned Messaages </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
            <button>
            <IoMdPersonAdd className="h-5 w-5 z-100 text-gray-400 cursor-pointer" />
          </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Friend to DM </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
            <button>
            <RxAvatar className="h-5 w-5 z-100 text-gray-400 cursor-pointer" />
          </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hide User Profile </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
       
       
        
        
      
        <div className="">
          <div className="flex w-full rounded-md relative items-center transition-all bg-black justify-center px-1">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={clsx(
                "px-1 outline-none  w-full border-none text-[14px] rounded-md py-[2px] text-gray-300 bg-transparent"
              )}
              placeholder="search"
            />
            <BiSearch
              className={clsx(
                "text-white  cursor-pointer w-4 h-4",
                value.length > 0
                  ? "hidden"
                  : "visible duration-1000 transition-transform transitio transform rotate-[360deg]"
              )}
            />
            <MdOutlineClose
              onClick={() => setValue("")}
              className={clsx(
                "text-white   cursor-pointer w-4 h-4",
                value.length > 0
                  ? "visible transition-transform duration-1000 transform rotate-[360deg]"
                  : "hidden"
              )}
            />
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
            <button>
            <HiInbox className="h-6 w-6 z-100 text-white cursor-pointer" />

          </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Inbox </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
            <button>
            <BiHelpCircle className="text-gray-400 z-100 w-6 h-6 cursor-pointer" />

          </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Help</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
       
      </div>
    </div>
  );
};

export default UserHeader;
