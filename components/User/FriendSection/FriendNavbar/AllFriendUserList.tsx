import React from 'react'
import AllUserBox, { AllUserBoxSkeleton } from './AllUserBox'

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
        friends?.map((item:any) => (
          <AllUserBox key={item?.id} item={item} />
        ))
      }
    </>
  )
}

export default AllFriendUserList




