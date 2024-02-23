import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
interface UserHeaderPartProps {
  imageUrl:string | undefined,
  displayName:string | undefined
  name:string | undefined
}
const HeaderPart = ({imageUrl,displayName,name}:UserHeaderPartProps) => {
  return (
    <div className="px-5  ">
      {/* avatar //pic */}
      <Avatar  className="w-32 h-32 ">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* name */}
      <h1 className="text-3xl mt-2 dark:text-white text-black">{name}</h1>
      {/* username */}
      <span className="text-xl mt-4  text-black dark:text-white">{displayName}</span>
      <p className="dark:text-gray-400 text-black mt-5">
        This is the beginning of your direct message history with {name}.
      </p>
      <div className="flex mt-3 items-center">
        <div className="flex relative  items-center justify-center">
          <Avatar className="absolute w-6 h-6 left-0 " />
          <Avatar className="absolute w-6 h-6 left-4" />
          <Avatar className="absolute  w-6 h-6 left-7 " />
          {/* mutal server */}
        </div>
        <span className="text-black dark:text-gray-400 text-md">3 mutal server</span>

        <div className="flex gap-2 ml-8">
          <button className="px-3 active:bg-[#5865f2d4] hover:bg-[#5865f276] rounded-md text-white text-sm bg-[#5865F2]">Add Friend</button>
          <button className="px-3 hover:bg-[#6a6d78] rounded-md text-sm text-white bg-[#4E5058] active:bg-[#4E5058]">Block</button>
          <button className=" hover:bg-[#e85358a5] px-3  text-sm text-white rounded-md  py-[2px] active:bg-[#DA373C] bg-[#DA373C]">Report Spam</button>
        </div>
      </div>
    </div>
  );
};

export default HeaderPart;
