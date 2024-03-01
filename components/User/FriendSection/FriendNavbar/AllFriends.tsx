"use client";
import clsx from "clsx";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { User } from "@prisma/client";
import { useAllFriendsQuery } from "@/hooks/use-all-friends-query";
import AllFriendUserList from "./AllFriendUserList";
import { createOrGetConversationOfUser } from "@/actions/conversation";
const AllFriends = ({ profile }: { profile: User }) => {
  
  let apiUrl = "/api/all-friends"
  let queryKey = `friends:${profile.id}:get`
  const [value, setValue] = useState("");
  const { data,isLoading } = useAllFriendsQuery({ apiUrl, queryKey })
 
  return (
    <div className="flex flex-[2]  border-r dark:border-gray-500 border-gray-300  ">
      <div className="px-7 py-3 w-full">
        <div className="bg-[#1E1F22] rounded-md flex items-center pr-2 gap-1">
          <input
            className="w-full rounded-md text-gray-300 font-light px-3 bg-transparent py-[0.3rem] outline-none border-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Search"
          />
          <BiSearch
            className={clsx(
              "text-white  cursor-pointer w-6 h-6",
              value.length > 0 ? "hidden" : "visible"
            )}
          />
          <MdOutlineClose
            onClick={() => setValue("")}
            className={clsx(
              "text-white  cursor-pointer w-6 h-6",
              value.length > 0 ? "visible" : "hidden"
            )}
          />
        </div>
        {/* friendlist */}
        <div className="mt-5">
          {/* title */}
          <span className="dark:text-gray-400 text-gray-700 font-light text-sm ">
            All Friends-1
          </span>
          {/* friendlist */}
          <div className="border-t dark:border-[#404249] border-gray-300  mt-4">
            <AllFriendUserList
              friends={data}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFriends;
