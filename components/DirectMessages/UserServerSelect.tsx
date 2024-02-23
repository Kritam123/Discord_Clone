"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "@/lib/utils";
const UserServerSelect = () => {
  const [selectOption, setSelectOption] = useState<boolean>(false);
  const handleSelectionOption = () => {
    setSelectOption(!selectOption);
  };
  return (
    <>
      <div className={cn("bg-white shadow-lg dark:bg-[#111214] w-full  text-sm  h-10  text-white  ov px-3 cursor-pointer py-3 rounded-lg")}>
        <button
          className="flex w-full justify-between outline-none border-none"
          onClick={handleSelectionOption}
        >
          <span className="dark:text-white text-black "> 3 mutual servers</span>
          <div className="flex">
            <IoIosArrowDown className={cn("w-5 dark:text-white text-black h-5 transition-all duration-400", selectOption === true ? "rotate-280" : "-rotate-90")} />
          </div>
        </button>
        <div className={cn("bg-white dark:bg-[#111214] mt-2 overflow-y-scroll w-full scrollHidden transition-all flex-col", selectOption === true ? "flex h-40" : "hidden h-0")}>
          <Box />
          <Box />
          <Box />
          <Box />
        </div>
      </div>
    </>
  );
};

const Box = () => {
  return (
    <>
      <div className="dark:hover:bg-[#313338] hover:bg-[#f2f2f2]  rounded-md flex items-center gap-2 px-2 py-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {/* name */}
        <span className="text-[16px] text-black dark:text-white ">Revolution Batch class 12</span>
      </div>
    </>
  );
};
export default UserServerSelect;
