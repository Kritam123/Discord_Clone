"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation } from "@prisma/client";
import clsx from "clsx";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5"
interface UserBoxProps {
  conversation:Conversation
}
const UserBox: React.FC<UserBoxProps> = ({conversation }) => {
  const [selected, setSelected] = useState(0);
  return (
    <div
      onClick={() => setSelected(0)}
      className={clsx(
        `flex cursor-pointer group rounded-md transition px-2   py-1 dark:hover:bg-[#3a3d40] hover:bg-[#f2f2f2]  items-center justify-between`,
        selected === 0 && "dark:bg-[#404249] bg-[#f2f2f2]"
      )}
    >
      <div className="flex items-center gap-3">
        {/* avatar */}
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>
            KT
          </AvatarFallback>
        </Avatar>
        {/* username */}
        <span className={clsx("dark:group-hover:text-white group-hover:text-black dark:text-gray-400 text-gray-700", selected === 0 && 'dark:text-white text-black')}>kritam</span>
      </div>
      <div>
        <IoClose className={clsx("text-gray-500 hidden group-hover:flex group-hover:text-white w-5 h-5", selected === 0 && 'dark:text-white text-black ')} />
      </div>
    </div>
  );
};

export default UserBox;
