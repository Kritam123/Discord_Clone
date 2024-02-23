"use client"
import React from "react";
import { BsFillMicFill, BsHeadphones } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { User } from "@prisma/client";
import { useModal } from "@/hooks/use-model-store"
import { UserButton } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface UserFooterProps {
    user: any
}
const UserFooter = ({ user }: UserFooterProps) => {
    const { onOpen } = useModal()
    return (
        <div className="absolute shadow-lg dark:border-none border-t border-gray-300 flex items-center justify-between px-3 py-3 bottom-0 h-[60px] w-full bg-white dark:bg-[#232428]">
            {/* left */}

            {/* leftSideAvataruser  */}
            <button className="flex items-center bg-white  shadow-sm dark:hover:bg-[#6763633b] dark:bg-[#f5f2f23b] rounded-md gap-2 px-1 py-1 cursor-pointer">

                <UserButton />
                {/* <Avatar>
                    <AvatarImage className="cursor-pointer " src={user?.image!} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar> */}

                <div className="flex flex-col">
                    {/* name */}
                    <span className="text-black dark:text-white text-sm">{user?.displayName?.length! > 8 ? user?.displayName.slice(0, 8) + "..." : user?.displayName}</span>
                    <span className="text-black dark:text-gray-400 text-sm">{user?.username?.length! > 8 ? user?.username.slice(0, 8) + "..." : user?.username}</span>
                </div>
            </button>
            {/* right */}
            <div className="flex gap-2">
                {/* mic */}
                <button className="hover:cursor-pointer z-10 px-1 py-1 hover:bg-slate-400 dark:hover:bg-slate-600 rounded-md">
                    <BsFillMicFill className="w-4 h-4   text-black  dark:text-white " />
                </button>
                {/* headphone */}
                <button className="cursor-pointer z-10 px-1 py-1 hover:bg-slate-400 dark:hover:bg-slate-600 rounded-md">
                    <BsHeadphones className="w-4 h-4 text-black  dark:text-white  " />
                </button>
                {/* setting */}
                <button onClick={() => onOpen("updateUser", { user })} className="cursor-pointer z-10 px-1 py-1 hover:bg-slate-400 dark:hover:bg-slate-600 rounded-md">
                    <AiFillSetting className="w-4 h-4 text-black  dark:text-white  " />
                </button>
            </div>
        </div>
    );
};

export default UserFooter;
