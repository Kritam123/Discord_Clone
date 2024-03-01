'use client'
import Image from 'next/image'
import React from 'react'
import { FriendRequest, User } from "@prisma/client";
import { useFriendRequest } from '@/hooks/use-friend-request-socket';
import { useFriendRequestsQuery } from '@/hooks/use-friend-request-query';
import UserBox from './UserBox';
import PendingUserBox from '../PendingUserBox';
const Pending = ({ profile }: { profile: User }) => {
  let apiUrl = "/api/friend-requests"
  let queryKey = `requests:${profile.id}:get`
  let createFriendKey = `request:${profile.id}:create`
  let updateFriendKey = `request:${profile.id}:update`

  const { data, error, isError, isLoading, status } = useFriendRequestsQuery({ apiUrl, queryKey })
  useFriendRequest({ createFriendKey, updateFriendKey, queryKey });
  return (
    <>
      <div className=" flex-[2] px-3 py-3 flex-col gap-4 border-r border-gray-500  ">
        {
          !!data?.length ? (
            <>
              {
                data?.map((request: any) => (
                  <PendingUserBox
                    request={request}
                  />

                ))

              }

            </>
          ) :
            (
              <div className='flex justify-center items-center flex-col h-full '>
                <Image
                  width={450}
                  height={450}
                  src={"/images/b36c705f790dad253981f1893085015a.svg"}
                  alt="svg"
                />
                <span className="dark:text-gray-400 text-gray-700 font-medium">There are no pending friend requests.Here&apos;s Wumpus for now.</span>
              </div>
            )
        }

      </div>
    </>
  )

}

export default Pending