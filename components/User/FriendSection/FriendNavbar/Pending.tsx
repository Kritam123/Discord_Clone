'use client'
import Image from 'next/image'
import React from 'react'
import { User } from "@prisma/client";
import { useFriendRequest } from '@/hooks/use-friend-request';
const Pending = ({ profile }: { profile: User }) => {
  let createKey = `request:${profile.id}:create`
  let deleteKey = `request:${profile.id}:update`
  let updateKey = `request:${profile.id}:delete`
  const { requestUser } = useFriendRequest({ createKey, deleteKey, updateKey });
  return (
    <>
      <div className="flex flex-[2]  flex-col gap-4 border-r border-gray-500 justify-center items-center ">
        <Image
          width={450}
          height={450}
          src={"/images/b36c705f790dad253981f1893085015a.svg"}
          alt="svg"
        />
        <span className="dark:text-gray-400 text-gray-700 font-medium">There are no pending friend requests.Here's Wumpus for now.</span>
      </div>
    </>
  )

}

export default Pending