'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface friendsWithProfileProps {
  item: Friends & {
    friend: User;
  };
}
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Friends, User } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { createOrGetConversationOfUser } from "@/actions/conversation";
import { useRouter } from "next/navigation";
const AllUserBox = ({ item }: any) => {
  const router = useRouter()
  const handleCreateOrGetConversation = async () => {
    try {
      const response = await createOrGetConversationOfUser(item?.userId, item?.friendId);
      router.push(`/channels/me/${response?.id}`);
    } catch (error) {
      console.log("Conversation_Create", error);
    }
  }
  return (
    <div className="flex cursor-pointer hover:bg-[#f2f2f2] dark:hover:bg-[#404249] rounded-md justify-between group py-2 px-2 items-center">
      <div className="flex gap-2">
        <div className="relative">
          <Avatar>
            <AvatarImage src={item?.friend?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 right-1 rounded-md w-3 h-3 bg-white " />
        </div>
        <div className="flex justify-center flex-col">
          <span className="dark:text-white text-gray-700 font-semibold">
            {item?.friend?.username}
          </span>
          <span className="dark:text-gray-400 text-gray-500 text-sm">
            {item?.friend?.status}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <Popover>
                <PopoverTrigger>
                  <button className="w-9 h-9 dark:group-hover:bg-[#1E1F22] group-hover:bg-[#ffff] rounded-full flex justify-center items-center text-gray-400 dark:bg-[#2B2D31] bg-[#e8e5e5] shadow-sm px-1 py-1">
                    <FiMessageSquare className="text-gray-700 dark:text-white w-5 h-5 " />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                  <div className="flex flex-col gap-3">
                    <Button
                      className="capitalize text-blue-500"
                      variant={"outline"}
                      onClick={handleCreateOrGetConversation}
                    >
                      send as message
                    </Button>
                    <Button
                      className="capitalize text-blue-500"
                      variant={"outline"}
                    >
                      Voice call
                    </Button>
                    <Button
                      className="capitalize text-blue-500"
                      variant={"outline"}
                    >
                      Video call
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
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

export const AllUserBoxSkeleton = () => {
  return (
    <>
      <Skeleton className="flex justify-between  h-14 py-2 px-2 items-center">
        <div className="flex gap-2">
          <div className="relative">
            <Skeleton className="w-5 h-5 rounded-full" />
          </div>
          <div className="flex justify-center flex-col">
            <Skeleton className="w-8 h-3" />
            <Skeleton className="w-5 h-3" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-9 h-9 px-1 py-1" />
          <Skeleton className="w-9 h-9 px-1 py-1" />
        </div>
      </Skeleton>
    </>
  );
};
