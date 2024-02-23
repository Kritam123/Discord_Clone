import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { MdAddReaction } from "react-icons/md"
import { IoLogoIonitron, IoIosMore } from "react-icons/io"
import { FaHashtag } from "react-icons/fa6"
const MessageBox = () => {
  return (
    <div className="hover:bg-[#2E3035] px-3 py-2 w-full h-fit relative group">
      <div className="flex gap-3">
        <div className="avatar">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex gap-0 flex-col">
          <div className="flex  h-fit items-center gap-2">
            <span className="text-white text-lg cursor-pointer hover:underline">
              Shreya
            </span>
            <p className="text-gray-400 text-[13px]">09/1/2023 9:58 pm</p>
          </div>
          <div className="text-gray-300">hello kritam 11111</div>
        </div>
      </div>
      <div className="gap-2 group-hover:flex absolute right-2 top-0 rounded-md px-2 py-2 hidden bg-[#1E1F22]">
        <MdAddReaction className="w-5 h-5 cursor-pointer  text-gray-400 hover:text-white" />
        <IoLogoIonitron className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        <FaHashtag className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        <IoIosMore className="w-5 h-5 text-gray-400  hover:text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default MessageBox;
