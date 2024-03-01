import React from 'react'
import AllUserBox, { AllUserBoxSkeleton } from './AllUserBox'
import { Friends, User } from '@prisma/client'
interface friendsWithProfileProps {
  item: Friends & {
    friend: User
  }
}
const AllFriendUserList = ({ friends, isLoading }: { friends: any, isLoading: any }) => {

  if (isLoading) {
    return (
      <div className='flex flex-col gap-1'>
        {[...Array(4)].map((_, i) => (
          <AllUserBoxSkeleton key={i} />
        ))}
      </div>
    )

  }
  return (
    <>
      {
        friends?.map((item: friendsWithProfileProps) => (
          <AllUserBox item={item} />
        ))
      }
    </>
  )
}

export default AllFriendUserList




