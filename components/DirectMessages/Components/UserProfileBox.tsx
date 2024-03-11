'use client'
import React from "react";
import UserServerSelect from "../UserServerSelect";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useDrawer } from "@/hooks/use-drawer-store";
import { IoIosClose } from "react-icons/io";
interface UserProfileBoxProps {
  imageUrl: string
  displayName: string
  name: string
  createdAt: string
}
const UserProfileBox = ({createdAt,displayName,imageUrl,name}:UserProfileBoxProps) => {
  const { isOpen,type,onClose } = useDrawer();
  const openProfile =  isOpen && type ==="openProfileDrawer"
  return (
    <div className={cn("bg-white px-2 max-[1150px]:fixed  w-50 top-10 right-0  max-[1150px]:translate-x-[100%]  dark:border-none border-gray-800 border-l dark:bg-[#232428]  h-full",openProfile && "max-[1150px]:translate-x-[0%]")}>
      {/* top heading */}
      <div className="bg-[#ED4545] relative  w-full h-28">
      <button onClick={()=>onClose()} className="w-8 hidden justify-center  items-center ml-2 mt-1 h-8 max-[1150px]:flex  absolute bg-gray-800 rounded-full px-1 py-1 ">
          <IoIosClose className="text-2xl text-white"/>
        </button>
        <div className=" bg-white dark:bg-[#232428] w-24 h-24 absolute left-3  bottom-[-35px] rounded-full flex items-center justify-center ">
          <Avatar className="w-[5rem] h-[5rem]">
            <AvatarImage src={imageUrl} />
            <AvatarFallback>`CN`</AvatarFallback>
          </Avatar>

        </div>
      </div>
      {/* box info */}
      <div className="flex flex-col gap-4 justify-center mt-16 items-center">
        <div className="bg-white shadow-lg  dark:shadow-none border border-gray-900 dark:bg-[#111214] min-h-80 w-80 px-3 py-1 rounded-lg h-64">
          {/* top title name */}
          <div className="flex flex-col py-3 border-b-[1px] border-gray-600">
            <h1 className=" text-black dark:text-gray-200 text-xl leading-5">{displayName} </h1>
            <span className=" text-black dark:text-gray-100 text-sm ">{name}</span>
          </div>
          <div className="flex flex-col py-3 border-b-[1px] border-gray-600">
            <h1 className="text-black dark:text-gray-200 text-[13px] uppercase leading-5 ">
              {" "}
              Discord memeber since{" "}
            </h1>
            <span className="dark:text-gray-400 text-black text-sm ">{createdAt}</span>
          </div>
          <div className="flex flex-col py-3 ">
            <h1 className="text-black dark:text-gray-200 text-[13px] uppercase leading-5 ">
              {" "}
              Note{" "}
            </h1>
            <textarea
              placeholder="click to add a note"
              className="bg-transparent resize-none scroll  min-h-24 text-black dark:text-gray-400 text-sm border-none outline-none"
            />
          </div>
        </div>
        <div className="w-80 ">
          <UserServerSelect />
        </div>
      </div>
    </div>
  );
};

export default UserProfileBox;
