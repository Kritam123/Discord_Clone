import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { FiMessageSquare } from "react-icons/fi"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import qs from "query-string";
import { HiOutlineDotsVertical } from "react-icons/hi"
import { FriendRequest, Friends, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from "axios";
import { cn } from "@/lib/utils";
interface UserBoxProps {
    searchUser: User & {
        sender: FriendRequest[]
        reciver: FriendRequest[]
        friends:Friends[]
    }
    profile: any
}

const UserBox = ({ searchUser, profile }: UserBoxProps) => {

    const handleSendRequest = async () => {
        const apiUrl = "/api/socket/friend-request"
        let senderId = profile.id;
        let reciverId = searchUser.id
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
            });
            await axios.post(url, { senderId, reciverId });
        } catch (error) {
            console.log(error);
        }
    }
    const isReciveRequest = searchUser?.sender?.some((item) => item.senderId === searchUser.id && item.reciverId === profile.id)
    const isFriends   = searchUser?.friends?.some((item)=>item?.friendId === profile?.id || item.userId === profile?.id)
    const isSendRequest = searchUser?.reciver?.some((item) => item.senderId === profile.id && item.reciverId === searchUser.id);
    console.log(searchUser)
    return (
        <div className="flex cursor-pointer hover:bg-[#f2f2f2] dark:hover:bg-[#404249] rounded-md justify-between group py-2 px-2 items-center">
            <div className="flex gap-2">
                <div className="relative">
                    <Avatar>
                        <AvatarImage src={searchUser?.image as string} />
                        <AvatarFallback>img</AvatarFallback>
                    </Avatar>
                    <div className={cn("absolute bottom-1 right-1 rounded-md w-3 h-3 bg-white ",searchUser?.status === "Online" && "bg-[#56ab47]")} />
                </div>
                <div className="flex justify-center flex-col">
                    <span className="dark:text-white text-gray-700 font-semibold">{searchUser?.username}</span>
                    <span className="dark:text-gray-400 text-gray-500 text-sm">{searchUser?.status}</span>
                </div>
            </div>
            <div className="flex gap-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>

                            <Popover>
                                <PopoverTrigger>
                                    <button className="w-9 h-9 dark:group-hover:bg-[#1E1F22] group-hover:bg-[#ffff] rounded-full flex justify-center items-center text-gray-400 dark:bg-[#2B2D31] bg-[#e8e5e5] shadow-sm px-1 py-1">
                                        <FiMessageSquare className="text-gray-700 dark:text-white w-5 h-5 " />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-fit">
                                    <div className="flex flex-col gap-3">
                                        <Button className="capitalize text-blue-500" variant={"outline"}>
                                            send as message
                                        </Button>
                                        <Button className="capitalize text-blue-500" variant={"outline"}>
                                            Voice call
                                        </Button>
                                        <Button className="capitalize text-blue-500" variant={"outline"}>
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
                {!isFriends && <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Popover>
                                <PopoverTrigger>
                                   <button className="w-9 h-9 dark:group-hover:bg-[#1E1F22] group-hover:bg-[#ffff] rounded-full flex justify-center items-center text-gray-400 dark:bg-[#2B2D31] bg-[#e8e5e5] shadow-sm px-1 py-1">
                                        <HiOutlineDotsVertical className="text-gray-700 dark:text-white w-5 h-5 " />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-fit">
                                    {!isFriends && !isReciveRequest && !isSendRequest && <Button
                                        onClick={handleSendRequest}
                                        className="capitalize bg-blue-700 text-white hover:bg-blue-500 hover:text-white" variant={"outline"}>
                                        send friend Request
                                    </Button>}
                                    {!isFriends && !isSendRequest && isReciveRequest && <Button
                                        onClick={handleSendRequest}
                                        className="capitalize bg-blue-700 text-white hover:bg-blue-500 hover:text-white" variant={"outline"}>
                                        Confirm Request
                                    </Button>}
                                    {!isFriends && isSendRequest && !isReciveRequest && <Button
                                        onClick={handleSendRequest}
                                        className="capitalize bg-blue-700 text-white hover:bg-blue-500 hover:text-white" variant={"outline"}>
                                        Cancel Request
                                    </Button>}
                                </PopoverContent>
                            </Popover>


                        </TooltipTrigger>
                        <TooltipContent>
                            <p>More</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>}
            </div>
        </div>
    );
};

export default UserBox;

