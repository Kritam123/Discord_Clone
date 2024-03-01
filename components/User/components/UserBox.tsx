"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation, DirectConversation } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5"
interface UserBoxProps {
  conversation:DirectConversation
}
const UserBox= ({conversation,user }:any) => {
  const {conversationId}:any =  useParams();
  const {conversationOne,conversationTwo  } = conversation;

  const otherUser = conversationOne.id === user?.id ? conversationTwo : conversationOne;
  const [selected, setSelected] = useState(0);
  return (
    <Link 
    href={`/channels/me/${conversation?.id}`}
      onClick={() => setSelected(0)}
      className={clsx(
        `flex cursor-pointer group rounded-md transition px-2   py-1 dark:hover:bg-[#3a3d40] hover:bg-[#f2f2f2]  items-center justify-between`,
        conversationId === conversation?.id && "dark:bg-[#404249] bg-[#f2f2f2]"
      )}
    >
      <div className="flex items-center gap-3">
        {/* avatar */}
        <Avatar className="w-8 h-8 rounded-full" >
          <AvatarImage src={otherUser?.image} />
          <AvatarFallback>
            KT
          </AvatarFallback>
        </Avatar>
        {/* username */}
        <span className={clsx("dark:group-hover:text-white group-hover:text-black dark:text-gray-400 text-gray-700", selected === 0 && 'dark:text-white text-black')}>{otherUser?.username}</span>
      </div>
      <div>
        <IoClose className={clsx("text-gray-500 hidden group-hover:flex group-hover:text-white w-5 h-5", selected === 0 && 'dark:text-white text-black ')} />
      </div>
    </Link>
  );
};

export default UserBox;
