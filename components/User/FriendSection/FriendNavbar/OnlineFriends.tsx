'use client';
import { useAllOnlineFriendsQuery } from '@/hooks/use-all-online-friends-query';
import Image from 'next/image'
import React from 'react';
import AllUserBox, { AllUserBoxSkeleton } from './AllUserBox';
const FriendAll = ({ profile }: any) => {
  let apiUrl = "/api/all-online-friends"
  let queryKey = `online:${profile.id}:get`
  const { data, isLoading } = useAllOnlineFriendsQuery({ apiUrl, queryKey });
  if (isLoading) {
    return (
      <div className=' flex-[2]  border-r dark:border-gray-500 border-gray-300 px-5 py-3'>
      <div className='flex flex-col gap-1'>
        {[...Array(4)].map((_, i) => (
          <AllUserBoxSkeleton key={i} />
          ))}
      </div>
    </div>
    )

  }
  return (
    <div className="flex flex-[2]  h-full px-5 py-3 flex-col gap-4 border-r dark:border-gray-500 border-gray-300  ">
      {
        
        !!data?.length ? (
          <>
            {
              data?.map((online: any) => (
                <AllUserBox item={online} />
              ))
            }
          </>

        )
          :
          <div className='justify-center flex flex-col h-full items-center'>
            <Image
             width={250}
             height={250}
             className=' lg:w-[450px] lg:h-[450px]'
              src={"/images/b36de980b174d7b798c89f35c116e5c6.svg"}
              alt="svg"
            />
            <span className="dark:text-gray-400 text-gray-700 font-medium">No one&apos;s around to play with Wumpus.</span>
          </div>

      }

    </div>
  )
}

export default FriendAll