"use client";
import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import UserBox from "./UserBox";
import { getUserByUserNameAction } from "@/actions/user";
const AddFriends = ({ user }: any) => {
  const [value, setValue] = useState("");
  const [searchUser, setSearchUser] = useState<User | null>(null);
  const handleGetUser = async () => {
    const user = await getUserByUserNameAction(value);
    setSearchUser(user);
  }
  return (
    <div className="flex flex-[2]  flex-col gap-4 border-r border-gray-500   ">
      <div className="px-7 py-5 border-b-[1px] border-gray-600">
        <h1 className="text-white text-md uppercase">Add friend</h1>
        <p className="text-sm mt-2 text-gray-700   dark:text-gray-400">
          You can friends with their Discord username.
        </p>
        <div className="w-full mt-3 flex justify-between relative items-center   bg-black rounded-md">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={40}
            className={clsx(
              "w-full px-3 py-3  rounded-md focus:ring-2 font-light h-full outline-none border-none bg-transparent text-gray-200 dark:text-gray-400",
              value.length > 0 && "ring-2"
            )}
            type="text"
            placeholder="You can add friends with their Discord username."
          />
          <button
            disabled={value.length < 0}
            onClick={() => handleGetUser()}
            className={clsx(
              "capitalize absolute  right-3  px-2 rounded-sm  text-sm py-1",
              value.length === 0
                ? "bg-[#3B428A] cursor-not-allowed text-gray-400"
                : "bg-[#5865F2] cursor-pointer  text-white hover:bg-[#525eb8] active:bg-[#6071f1]"
            )}
          >
            Find friends
          </button>
        </div>
      </div>
      {
        searchUser !== null ? (
          <>
            <UserBox searchUser={searchUser as any} profile={user} />
          </>
        )
          : (
            <>
              <div className="flex  flex-col items-center">
                <Image
                  width={450}
                  height={450}
                  src={"/images/b5eb2f7d6b3f8cc9b60be4a5dcf28015.svg"}
                  alt="svg"
                />
                <span className="dark:text-gray-400 text-gray-700 font-medium"> Wumpus is waiting on friends.You don&apos;t have to though!</span>
              </div>
            </>
          )
      }
    </div>
  );
};

export default AddFriends;
